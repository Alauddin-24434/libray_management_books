import express from 'express';
import { memberControllers } from './member.controller';

const router = express.Router();


// POST /members - Calls the createMember controller to add a new member to the database
router.post('/members', memberControllers.createMember);


// GET /members - Calls the getAllMembers controller to retrieve all members from the database
router.get('/members', memberControllers.getAllMembers);

// GET /members/:memberId - Calls the getSingleMembersById controller to retrieve a specific member based on the member ID
router.get('/members/:memberId', memberControllers.getSingleMemberById);


// PUT /members/:memberId - Calls the updateMember controller to modify the details of a specific member using the member ID
router.put('/members/:memberId', memberControllers.updateMember);


// DELETE /members/:memberId - Calls the deleteMemberById controller to remove a specific member from the database using the member ID
router.delete('/members/:memberId', memberControllers.deleteMemberById);

export const memberRoutes = router;
