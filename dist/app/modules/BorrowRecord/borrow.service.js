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
exports.borrowServices = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Borrow a book
const borrowBookFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the book is already borrowed by the member
    const existingBorrow = yield prisma.borrowRecord.findFirst({
        where: {
            bookId: payload.bookId,
            memberId: payload.memberId,
        },
    });
    if (existingBorrow) {
        // If the book is already borrowed, throw an error
        throw new Error("This book is already borrowed by the member.");
    }
    // Create a new borrow record
    const borrowData = {
        bookId: payload.bookId,
        memberId: payload.memberId,
        borrowDate: new Date().toISOString(),
    };
    const borrowBook = yield prisma.borrowRecord.create({
        data: borrowData,
    });
    return borrowBook;
});
// Return a book
const returnBookFromDB = (borrowId) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the borrow record by borrowId
    const borrowRecord = yield prisma.borrowRecord.findUnique({
        where: {
            borrowId: borrowId,
        },
    });
    if (!borrowRecord) {
        throw new Error("Borrow record not found.");
    }
    // Update the borrow record to mark the book as returned
    const returnedBook = yield prisma.borrowRecord.update({
        where: {
            borrowId: borrowId,
        },
        data: {
            returnDate: new Date().toISOString(), // Set current date and time as return date
        },
    });
    return returnedBook;
});
const overdueBorrowListFormDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const fourteenDaysAgo = new Date();
    console.log(fourteenDaysAgo);
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
    const overdueBorrows = yield prisma.borrowRecord.findMany({
        where: {
            borrowDate: { lt: fourteenDaysAgo },
            returnDate: null,
        },
        include: {
            book: true,
            member: true,
        },
    });
    const overdueList = overdueBorrows.map((borrow) => {
        const overdueDays = Math.floor((new Date().getTime() - new Date(borrow.borrowDate).getTime()) / (1000 * 60 * 60 * 24)) - 14;
        return {
            borrowId: borrow.borrowId,
            bookTitle: borrow.book.title,
            borrowerName: borrow.member.name,
            overdueDays,
        };
    });
    return {
        success: true,
        status: 200,
        message: overdueList.length > 0 ? "Overdue borrow list fetched" : "No overdue books",
        data: overdueList,
    };
});
exports.borrowServices = {
    borrowBookFromDB,
    returnBookFromDB,
    overdueBorrowListFormDB,
};
