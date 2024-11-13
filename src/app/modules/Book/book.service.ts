import { PrismaClient } from "@prisma/client";
import AppError from "../../error/appError";
import { IBook } from "./book.interface";

const prisma = new PrismaClient();

// Create a new book
const createBookInDB = async (payload: IBook) => {
  // Check if a book with the same title already exists
  const existingBook = await prisma.book.findUnique({
    where:{
        title:payload.title,
    }
  })


  if (existingBook) {
    throw new AppError(400, "Book with this title already exists");
  }

  // If no existing book, create a new one
  const book = await prisma.book.create({
    data: payload,
  });

  return book;
};

// Get all books
const getAllBooksFromDB = async () => {
  const books = await prisma.book.findMany();
  return books;
};

// Get a book by ID
const getBookByIdFromDB = async (bookId: string) => {
  const book = await prisma.book.findUnique({
    where: {
      bookId: bookId,
    },
  });

  if (!book) {
    throw new AppError(404, "Book not found");
  }

  return book;
};

// Update a book by ID
const updateBookByIdFromDB = async (
  bookId: string,
  payload: Partial<IBook>
) => {
  const existingBook = await prisma.book.findUnique({
    where: {
      bookId: bookId,
    },
  });

  if (!existingBook) {
    throw new AppError(404, "Book not found");
  }

  // Update book details
  const updatedBook = await prisma.book.update({
    where: {
      bookId: bookId,
    },
    data: payload,
  });

  return updatedBook;
};

// Delete a book by ID
const deleteBookFromDB = async (bookId: string) => {
  // Check if the book exists
  const existingBook = await prisma.book.findUnique({
    where: {
      bookId: bookId,
    },
  });

  if (!existingBook) {
    throw new AppError(404, "Book not found");
  }

  // Check if there are any active borrow records for the book
  const activeBorrows = await prisma.borrowRecord.findMany({
    where: {
      bookId: bookId,
      returnDate: null, // Checking for active borrows (not yet returned)
    },
  });

  if (activeBorrows.length > 0) {
    throw new AppError(400, "Cannot delete the book as it is currently borrowed.");
  }

  // Permanently delete the book if there are no active borrow records
  const deletedBook = await prisma.book.delete({
    where: {
      bookId: bookId,
    },
  });

  return deletedBook;
};
export const bookServices = {
  createBookInDB,
  getAllBooksFromDB,
  getBookByIdFromDB,
  updateBookByIdFromDB,
  deleteBookFromDB,
};
