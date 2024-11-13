"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
// catchAsync middleware to wrap async functions
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((error) => next(error)); // Pass any error to next()
    };
};
exports.catchAsync = catchAsync;
