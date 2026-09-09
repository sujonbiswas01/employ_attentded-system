import { Router } from "express";
import { AttendanceController } from "./attendance.controller";
import auth from "../../middleware/Auth";
import { validateRequest } from "../../middleware/validateRequest";
import { checkInSchema, checkOutSchema } from "./attendance.validation";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// Check-In (All authenticated employees)
router.post(
  "/check-in",
  auth([Role.ADMIN, Role.HR, Role.EMPLOYEE]),
  validateRequest(checkInSchema),
  AttendanceController.checkIn
);

// Check-Out (All authenticated employees)
router.patch(
  "/check-out",
  auth([Role.ADMIN, Role.HR, Role.EMPLOYEE]),
  validateRequest(checkOutSchema),
  AttendanceController.checkOut
);

// Get My Attendance Logs
router.get(
  "/my-history",
  auth([Role.ADMIN, Role.HR, Role.EMPLOYEE]),
  AttendanceController.getMyAttendanceHistory
);

export const AttendanceRoutes = router;