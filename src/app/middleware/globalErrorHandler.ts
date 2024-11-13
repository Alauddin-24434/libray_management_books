import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";


import AppError from "../error/appError";
import config from "../config";

export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};

// Prisma validation error handler
const handlePrismaValidationError = (err: Prisma.PrismaClientValidationError): TGenericErrorResponse => {
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorSources: [
      {
        path: "",
        message: err.message,
      },
    ],
  };
};

// Prisma unique constraint error handler
const handlePrismaUniqueConstraintError = (err: Prisma.PrismaClientKnownRequestError): TGenericErrorResponse => {
  const statusCode = 400;
  const errorSources: TErrorSources = err.meta && err.meta.target
    ? [{ path: err.meta.target as string, message: "This field must be unique." }]
    : [{ path: "", message: "Unique constraint error." }];

  return {
    statusCode,
    message: "Unique Constraint Violation",
    errorSources,
  };
};

// Prisma general error handler
const handlePrismaError = (err: Prisma.PrismaClientKnownRequestError): TGenericErrorResponse => {
  const statusCode = 500;
  return {
    statusCode,
    message: "Database Error",
    errorSources: [
      {
        path: "",
        message: err.message,
      },
    ],
  };
};


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources: TErrorSources = [{ path: "", message: "Something went wrong" }];


  if (err instanceof Prisma.PrismaClientValidationError) {
    const simplifiedError = handlePrismaValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") { // Unique constraint violation
      const simplifiedError = handlePrismaUniqueConstraintError(err);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      errorSources = simplifiedError.errorSources;
    } else {
      const simplifiedError = handlePrismaError(err);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      errorSources = simplifiedError.errorSources;
    }
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [{ path: "", message: err.message }];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [{ path: "", message: err.message }];
  }

  // Send the response
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.nodeEnv === "development" ? err.stack : null, // Show stack trace only in development
  });
};

export default globalErrorHandler;
