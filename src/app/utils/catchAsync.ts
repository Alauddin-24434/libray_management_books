import { NextFunction, Request, Response } from "express";

// catchAsync middleware to wrap async functions
export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((error) => next(error)); // Pass any error to next()
  };
};
