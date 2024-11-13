"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const appError_1 = __importDefault(require("../error/appError"));
const config_1 = __importDefault(require("../config"));
// Prisma validation error handler
const handlePrismaValidationError = (err) => {
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
const handlePrismaUniqueConstraintError = (err) => {
    const statusCode = 400;
    const errorSources = err.meta && err.meta.target
        ? [{ path: err.meta.target, message: "This field must be unique." }]
        : [{ path: "", message: "Unique constraint error." }];
    return {
        statusCode,
        message: "Unique Constraint Violation",
        errorSources,
    };
};
// Prisma general error handler
const handlePrismaError = (err) => {
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
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorSources = [{ path: "", message: "Something went wrong" }];
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        const simplifiedError = handlePrismaValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") { // Unique constraint violation
            const simplifiedError = handlePrismaUniqueConstraintError(err);
            statusCode = simplifiedError.statusCode;
            message = simplifiedError.message;
            errorSources = simplifiedError.errorSources;
        }
        else {
            const simplifiedError = handlePrismaError(err);
            statusCode = simplifiedError.statusCode;
            message = simplifiedError.message;
            errorSources = simplifiedError.errorSources;
        }
    }
    else if (err instanceof appError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        errorSources = [{ path: "", message: err.message }];
    }
    else if (err instanceof Error) {
        message = err.message;
        errorSources = [{ path: "", message: err.message }];
    }
    // Send the response
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config_1.default.nodeEnv === "development" ? err.stack : null, // Show stack trace only in development
    });
};
exports.default = globalErrorHandler;
