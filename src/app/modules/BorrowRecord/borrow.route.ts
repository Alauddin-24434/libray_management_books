import express from 'express';
import { borrowControllers } from './borrow.controller';

const router = express.Router();

// Route for borrowing a book
router.post('/borrow', borrowControllers.borrowBook);
router.get('/borrow/overdue', borrowControllers.overdueBorrowList);

// Route for returning a book
router.post('/return', borrowControllers.returnBook);

export const borrowRoutes = router;
