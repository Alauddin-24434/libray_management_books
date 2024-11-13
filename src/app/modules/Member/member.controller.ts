import { Request, Response } from "express";
import { memberServices } from "./member.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


// Controller to create a new member
const createMember = catchAsync(async (req: Request, res: Response) => {
  const result = await memberServices.createMemberInDB(req.body);
  sendResponse(res, 201, "Member created successfully", true, result);
});

// Controller to retrieve all members
const getAllMembers = catchAsync(async (req: Request, res: Response) => {
  const members = await memberServices.getAllMembersFromDB();
  sendResponse(res, 200, "Members retrieved successfully", true, members);
});

// Controller to retrieve a single member by ID
const getSingleMemberById = catchAsync(async (req: Request, res: Response) => {
  const memberId = req.params.memberId;
  const member = await memberServices.getMemberByIdFromDB(memberId);
  sendResponse(res, 200, "Member retrieved successfully", true, member);
});

// Controller to delete a member by ID
const deleteMemberById = catchAsync(async (req: Request, res: Response) => {
  const memberId = req.params.memberId;
  await memberServices.deleteMemberFromDB(memberId);
  sendResponse(res, 200, "Member deleted successfully", true);
});

// Controller to update member details by ID
const updateMember = catchAsync(async (req: Request, res: Response) => {
  const result = await memberServices.updateMemberByIdFromDB(
    req.params.memberId,
    req.body
  );
  sendResponse(res, 200, "Member updated successfully", true, result);
});

// Export all member-related controllers for use in routes
export const memberControllers = {
  createMember,
  getAllMembers,
  getSingleMemberById,
  updateMember,
  deleteMemberById
};
