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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const book_service_1 = require("./book.service");
// Create a new book
const createBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.bookServices.createBookInDB(req.body);
    (0, sendResponse_1.sendResponse)(res, 201, "Book created successfully", true, result);
}));
// Get all books
const getAllBooks = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_service_1.bookServices.getAllBooksFromDB();
    (0, sendResponse_1.sendResponse)(res, 200, "Books retrieved successfully", true, books);
}));
// Get a single book by ID
const getSingleBookById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield book_service_1.bookServices.getBookByIdFromDB(bookId);
    (0, sendResponse_1.sendResponse)(res, 200, "Book retrieved successfully", true, book);
}));
// Update a book by ID
const updateBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.bookServices.updateBookByIdFromDB(req.params.bookId, req.body);
    (0, sendResponse_1.sendResponse)(res, 200, "Book updated successfully", true, result);
}));
// Delete a book by ID
const deleteBookById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    yield book_service_1.bookServices.deleteBookFromDB(bookId);
    (0, sendResponse_1.sendResponse)(res, 200, "Book deleted successfully", true);
}));
exports.bookControllers = {
    createBook,
    getAllBooks,
    getSingleBookById,
    updateBook,
    deleteBookById,
};
