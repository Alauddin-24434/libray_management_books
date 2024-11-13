"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookServices = void 0;
const client_1 = require("@prisma/client");
const appError_1 = __importDefault(require("../../error/appError"));
const prisma = new client_1.PrismaClient();
// Create a new book
const createBookInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if a book with the same title already exists
    const existingBook = yield prisma.book.findUnique({
        where: {
            title: payload.title,
        }
    });
    if (existingBook) {
        throw new appError_1.default(400, "Book with this title already exists");
    }
    // If no existing book, create a new one
    const book = yield prisma.book.create({
        data: payload,
    });
    return book;
});
// Get all books
const getAllBooksFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield prisma.book.findMany();
    return books;
});
// Get a book by ID
const getBookByIdFromDB = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma.book.findUnique({
        where: {
            bookId: bookId,
        },
    });
    if (!book) {
        throw new appError_1.default(404, "Book not found");
    }
    return book;
});
// Update a book by ID
const updateBookByIdFromDB = (bookId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingBook = yield prisma.book.findUnique({
        where: {
            bookId: bookId,
        },
    });
    if (!existingBook) {
        throw new appError_1.default(404, "Book not found");
    }
    // Update book details
    const updatedBook = yield prisma.book.update({
        where: {
            bookId: bookId,
        },
        data: payload,
    });
    return updatedBook;
});
// Delete a book by ID
const deleteBookFromDB = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the book exists
    const existingBook = yield prisma.book.findUnique({
        where: {
            bookId: bookId,
        },
    });
    if (!existingBook) {
        throw new appError_1.default(404, "Book not found");
    }
    // Check if there are any active borrow records for the book
    const activeBorrows = yield prisma.borrowRecord.findMany({
        where: {
            bookId: bookId,
            returnDate: null, // Checking for active borrows (not yet returned)
        },
    });
    if (activeBorrows.length > 0) {
        throw new appError_1.default(400, "Cannot delete the book as it is currently borrowed.");
    }
    // Permanently delete the book if there are no active borrow records
    const deletedBook = yield prisma.book.delete({
        where: {
            bookId: bookId,
        },
    });
    return deletedBook;
});
exports.bookServices = {
    createBookInDB,
    getAllBooksFromDB,
    getBookByIdFromDB,
    updateBookByIdFromDB,
    deleteBookFromDB,
};
