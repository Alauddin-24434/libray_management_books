"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
// Route to create a new book
// POST /api/books - Calls the createBook controller to add a new book to the database
router.post('/books', book_controller_1.bookControllers.createBook);
// Route to get all books
// GET /api/books - Calls the getAllBooks controller to retrieve all books in the library
router.get('/books', book_controller_1.bookControllers.getAllBooks);
// Route to get a single book by ID
// GET /api/books/:bookId - Calls the getSingleBookById controller to retrieve details of a specific book by its bookId
router.get('/books/:bookId', book_controller_1.bookControllers.getSingleBookById);
// Route to update a book by ID
// PUT /api/books/:bookId - Calls the updateBook controller to modify details of an existing book by its bookId
router.put('/books/:bookId', book_controller_1.bookControllers.updateBook);
// Route to delete a book by ID
// DELETE /api/books/:bookId - Calls the deleteBookById controller to remove a specific book from the library by its bookId
router.delete('/books/:bookId', book_controller_1.bookControllers.deleteBookById);
exports.bookRoutes = router;
