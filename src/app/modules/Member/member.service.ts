import { PrismaClient } from "@prisma/client";
import AppError from "../../error/appError";

const prisma = new PrismaClient();

const createMemberInDB = async (payload: IMember) => {
  // Check if a member with the same email already exists
  const existingMember = await prisma.member.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (existingMember) {
    throw new AppError(404, "Member with this email already exists"); // Custom error with status code 400
  }

  // If no existing member, create a new one
  const member = await prisma.member.create({
    data: payload,
  });

  return member;
};

const getAllMembersFromDB = async () => {
  const members = await prisma.member.findMany();
  return members;
};

const getMemberByIdFromDB = async (memberId: string) => {
  const member = await prisma.member.findUnique({
    where: {
      memberId: memberId, // Assuming `id` is the unique identifier for a member
    },
  });

  if (!member) {
    throw new AppError(404, "Member not found");
  }

  return member;
};


const deleteMemberFromDB = async (memberId: string) => {
  // Check if the member exists
  const existingMember = await prisma.member.findUnique({
    where: {
      memberId: memberId,
    },
  });

  if (!existingMember) {
    throw new AppError(404, "Member not found");
  }

  // Check if the member has any active borrow records
  const activeBorrows = await prisma.borrowRecord.findMany({
    where: {
      memberId: memberId,
      returnDate: null, // Borrow record is still active if returnDate is null
    },
  });

  if (activeBorrows.length > 0) {
    throw new AppError(400, "Cannot delete the member as they have active borrow records.");
  }

  // Permanently delete the member if there are no active borrow records
  const deletedMember = await prisma.member.delete({
    where: {
      memberId: memberId,
    },
  });

  return deletedMember;
};


// updateMemberByID
const updateMemberByIdFromDB = async (
  memberId: string,
  payload: Partial<IMember>
) => {
  const existingMember = await prisma.member.findUnique({
    where: {
      memberId: memberId,
    },
  });

  if (!existingMember) {
    throw new AppError(404, "Member not found");
  }

  // update member
  const updateMember = await prisma.member.update({
    where: {
      memberId: memberId,
    },
    data: payload,
  });

  return updateMember;
};

export const memberServices = {
  createMemberInDB,
  getAllMembersFromDB,
  getMemberByIdFromDB,
  updateMemberByIdFromDB,
  deleteMemberFromDB,
};
