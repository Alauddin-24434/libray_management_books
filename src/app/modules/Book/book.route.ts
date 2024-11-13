import express from 'express';
import { bookControllers } from './book.controller';

const router = express.Router();

// Route to create a new book
// POST /api/books - Calls the createBook controller to add a new book to the database
router.post('/books', bookControllers.createBook);

// Route to get all books
// GET /api/books - Calls the getAllBooks controller to retrieve all books in the library
router.get('/books', bookControllers.getAllBooks);

// Route to get a single book by ID
// GET /api/books/:bookId - Calls the getSingleBookById controller to retrieve details of a specific book by its bookId
router.get('/books/:bookId', bookControllers.getSingleBookById);

// Route to update a book by ID
// PUT /api/books/:bookId - Calls the updateBook controller to modify details of an existing book by its bookId
router.put('/books/:bookId', bookControllers.updateBook);

// Route to delete a book by ID
// DELETE /api/books/:bookId - Calls the deleteBookById controller to remove a specific book from the library by its bookId
router.delete('/books/:bookId', bookControllers.deleteBookById);

export const bookRoutes = router;
