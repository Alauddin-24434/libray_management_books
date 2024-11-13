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
exports.borrowControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const borrow_service_1 = require("./borrow.service");
const borrowBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield borrow_service_1.borrowServices.borrowBookFromDB(req.body);
    (0, sendResponse_1.sendResponse)(res, 200, "Book borrowed successfully", true, result);
}));
const overdueBorrowList = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield borrow_service_1.borrowServices.overdueBorrowListFormDB();
    (0, sendResponse_1.sendResponse)(res, 200, "Overdue borrow list fetched", true, result);
}));
const returnBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { borrowId } = req.body;
    // Validate the borrowId (ensure it's a string and it's required)
    if (!borrowId) {
        return (0, sendResponse_1.sendResponse)(res, 400, "Borrow ID is required", false);
    }
    // Call the service to return the book
    const result = yield borrow_service_1.borrowServices.returnBookFromDB(borrowId);
    // Return success response
    (0, sendResponse_1.sendResponse)(res, 200, "Book returned successfully", true, result);
}));
exports.borrowControllers = {
    borrowBook,
    returnBook,
    overdueBorrowList
};
