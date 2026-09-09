import { Router } from "express";
import { LeaveRequestController } from "./leave-request.controller";
import auth from "../../middleware/Auth";
import { validateRequest } from "../../middleware/validateRequest";
import { createLeaveRequestSchema, updateLeaveStatusSchema } from "./leave-request.validation";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// ১. ছুটির জন্য আবেদন পেশ করা
router.post(
  "/",
  auth([Role.ADMIN, Role.HR, Role.EMPLOYEE]),
  validateRequest(createLeaveRequestSchema),
  LeaveRequestController.createLeaveRequest
);

// ২. নিজের ছুটির তালিকা দেখা
router.get(
  "/my-requests",
  auth([Role.ADMIN, Role.HR, Role.EMPLOYEE]),
  LeaveRequestController.getMyLeaveRequests
);

// ৩. সকল কর্মীদের ছুটির তালিকা পর্যবেক্ষণ করা (HR/Admin)
router.get(
  "/",
  auth([Role.ADMIN, Role.HR]),
  LeaveRequestController.getAllLeaveRequests
);

// ৪. ছুটির আবেদন মঞ্জুর বা নাকচ করা (HR/Admin)
router.patch(
  "/:id/status",
  auth([Role.ADMIN, Role.HR]),
  validateRequest(updateLeaveStatusSchema),
  LeaveRequestController.updateLeaveStatus
);

export const LeaveRequestRoutes = router;