"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberRoutes = void 0;
const express_1 = __importDefault(require("express"));
const member_controller_1 = require("./member.controller");
const router = express_1.default.Router();
// POST /members - Calls the createMember controller to add a new member to the database
router.post('/members', member_controller_1.memberControllers.createMember);
// GET /members - Calls the getAllMembers controller to retrieve all members from the database
router.get('/members', member_controller_1.memberControllers.getAllMembers);
// GET /members/:memberId - Calls the getSingleMembersById controller to retrieve a specific member based on the member ID
router.get('/members/:memberId', member_controller_1.memberControllers.getSingleMemberById);
// PUT /members/:memberId - Calls the updateMember controller to modify the details of a specific member using the member ID
router.put('/members/:memberId', member_controller_1.memberControllers.updateMember);
// DELETE /members/:memberId - Calls the deleteMemberById controller to remove a specific member from the database using the member ID
router.delete('/members/:memberId', member_controller_1.memberControllers.deleteMemberById);
exports.memberRoutes = router;
