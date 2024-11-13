import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { borrowServices } from "./borrow.service";

const borrowBook = catchAsync(async (req: Request, res: Response) => {
  const result = await borrowServices.borrowBookFromDB(req.body);
  sendResponse(res, 200, "Book borrowed successfully", true, result);
});
const overdueBorrowList = catchAsync(async (req: Request, res: Response) => {
  const result = await borrowServices.overdueBorrowListFormDB();
  sendResponse(res, 200, "Overdue borrow list fetched", true, result);
});


const returnBook = catchAsync(async (req: Request, res: Response) => {
  const { borrowId } = req.body;

  // Validate the borrowId (ensure it's a string and it's required)
  if (!borrowId) {
    return sendResponse(res, 400, "Borrow ID is required", false);
  }

  // Call the service to return the book
  const result = await borrowServices.returnBookFromDB(borrowId);

  // Return success response
  sendResponse(res, 200, "Book returned successfully", true, result);
});


export const borrowControllers={
    borrowBook,
    returnBook,
    overdueBorrowList
}