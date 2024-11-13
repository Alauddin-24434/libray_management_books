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
exports.memberServices = void 0;
const client_1 = require("@prisma/client");
const appError_1 = __importDefault(require("../../error/appError"));
const prisma = new client_1.PrismaClient();
const createMemberInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if a member with the same email already exists
    const existingMember = yield prisma.member.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (existingMember) {
        throw new appError_1.default(404, "Member with this email already exists"); // Custom error with status code 400
    }
    // If no existing member, create a new one
    const member = yield prisma.member.create({
        data: payload,
    });
    return member;
});
const getAllMembersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const members = yield prisma.member.findMany();
    return members;
});
const getMemberByIdFromDB = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const member = yield prisma.member.findUnique({
        where: {
            memberId: memberId, // Assuming `id` is the unique identifier for a member
        },
    });
    if (!member) {
        throw new appError_1.default(404, "Member not found");
    }
    return member;
});
const deleteMemberFromDB = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the member exists
    const existingMember = yield prisma.member.findUnique({
        where: {
            memberId: memberId,
        },
    });
    if (!existingMember) {
        throw new appError_1.default(404, "Member not found");
    }
    // Check if the member has any active borrow records
    const activeBorrows = yield prisma.borrowRecord.findMany({
        where: {
            memberId: memberId,
            returnDate: null, // Borrow record is still active if returnDate is null
        },
    });
    if (activeBorrows.length > 0) {
        throw new appError_1.default(400, "Cannot delete the member as they have active borrow records.");
    }
    // Permanently delete the member if there are no active borrow records
    const deletedMember = yield prisma.member.delete({
        where: {
            memberId: memberId,
        },
    });
    return deletedMember;
});
// updateMemberByID
const updateMemberByIdFromDB = (memberId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingMember = yield prisma.member.findUnique({
        where: {
            memberId: memberId,
        },
    });
    if (!existingMember) {
        throw new appError_1.default(404, "Member not found");
    }
    // update member
    const updateMember = yield prisma.member.update({
        where: {
            memberId: memberId,
        },
        data: payload,
    });
    return updateMember;
});
exports.memberServices = {
    createMemberInDB,
    getAllMembersFromDB,
    getMemberByIdFromDB,
    updateMemberByIdFromDB,
    deleteMemberFromDB,
};
