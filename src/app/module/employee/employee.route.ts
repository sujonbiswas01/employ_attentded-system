import { Router } from "express";
import { EmployeeController } from "./employee.controller";
import auth from "../../middleware/Auth";
import { validateRequest } from "../../middleware/validateRequest";
import { createEmployeeSchema, updateEmployeeSchema } from "./employee.validation";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// ১. logged-in ইউজারের নিজস্ব প্রোফাইল ফেচ
router.get(
  "/me",
  auth([Role.ADMIN, Role.HR, Role.EMPLOYEE]),
  EmployeeController.getMyProfile
);

// ২. নতুন প্রোফাইল তৈরি (Self/Admin/HR)
router.post(
  "/create-profile",
  auth([Role.ADMIN, Role.HR, Role.EMPLOYEE]),
  validateRequest(createEmployeeSchema),
  EmployeeController.createEmployeeProfile
);

// ৩. সকল Employee তালিকা দেখা (শুধু HR এবং Admin)
router.get(
  "/",
  auth([Role.ADMIN, Role.HR]),
  EmployeeController.getAllEmployees
);

// ৪. 특정 Employee-এর প্রোফাইল আপডেট করা (Admin এবং HR)
router.patch(
  "/:id",
  auth([Role.ADMIN, Role.HR]),
  validateRequest(updateEmployeeSchema),
  EmployeeController.updateEmployeeProfile
);

export const EmployeeRoutes = router;