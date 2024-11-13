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
exports.memberControllers = void 0;
const member_service_1 = require("./member.service");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
// Controller to create a new member
const createMember = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.memberServices.createMemberInDB(req.body);
    (0, sendResponse_1.sendResponse)(res, 201, "Member created successfully", true, result);
}));
// Controller to retrieve all members
const getAllMembers = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const members = yield member_service_1.memberServices.getAllMembersFromDB();
    (0, sendResponse_1.sendResponse)(res, 200, "Members retrieved successfully", true, members);
}));
// Controller to retrieve a single member by ID
const getSingleMemberById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memberId = req.params.memberId;
    const member = yield member_service_1.memberServices.getMemberByIdFromDB(memberId);
    (0, sendResponse_1.sendResponse)(res, 200, "Member retrieved successfully", true, member);
}));
// Controller to delete a member by ID
const deleteMemberById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memberId = req.params.memberId;
    yield member_service_1.memberServices.deleteMemberFromDB(memberId);
    (0, sendResponse_1.sendResponse)(res, 200, "Member deleted successfully", true);
}));
// Controller to update member details by ID
const updateMember = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.memberServices.updateMemberByIdFromDB(req.params.memberId, req.body);
    (0, sendResponse_1.sendResponse)(res, 200, "Member updated successfully", true, result);
}));
// Export all member-related controllers for use in routes
exports.memberControllers = {
    createMember,
    getAllMembers,
    getSingleMemberById,
    updateMember,
    deleteMemberById
};
