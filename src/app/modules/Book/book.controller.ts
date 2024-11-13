import {  Request, Response } from "express";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { bookServices } from "./book.service";

// Create a new book
const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookServices.createBookInDB(req.body);
  sendResponse(res, 201, "Book created successfully", true, result);
});

// Get all books
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const books = await bookServices.getAllBooksFromDB();
  sendResponse(res, 200, "Books retrieved successfully", true, books);
});

// Get a single book by ID
const getSingleBookById = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const book = await bookServices.getBookByIdFromDB(bookId);
  sendResponse(res, 200, "Book retrieved successfully", true, book);
});

// Update a book by ID
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookServices.updateBookByIdFromDB(req.params.bookId, req.body);
  sendResponse(res, 200, "Book updated successfully", true, result);
});

// Delete a book by ID
const deleteBookById = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  await bookServices.deleteBookFromDB(bookId);
  sendResponse(res, 200, "Book deleted successfully", true);
});

export const bookControllers = {
  createBook,
  getAllBooks,
  getSingleBookById,
  updateBook,
  deleteBookById,
};
