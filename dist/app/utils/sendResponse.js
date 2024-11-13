"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
// Response structure with status code, message, success, and data
const sendResponse = (res, statusCode, message, success, data = null) => {
    // Send the response with the given parameters
    res.status(statusCode).json({
        success,
        status: statusCode,
        message,
        data,
    });
};
exports.sendResponse = sendResponse;
