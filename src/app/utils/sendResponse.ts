import { Response } from "express";

// Response structure with status code, message, success, and data
export const sendResponse = (
  res: Response,
  statusCode: number,
  message: string,
  success: boolean,
  data: any = null
) => {



  // Send the response with the given parameters
  res.status(statusCode).json({
    success,
    status:statusCode,
    message,
    data,
  });
};
