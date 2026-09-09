import { Router } from "express";
import { DepartmentPositionController } from "./department-position.controller";
import auth from "../../middleware/Auth";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createDepartmentSchema,
  updateDepartmentSchema,
  createPositionSchema,
  updatePositionSchema,
} from "./department-position.validation";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// ================= DEPARTMENT ROUTES =================
router.post(
  "/departments",
  auth([Role.ADMIN, Role.HR]),
  validateRequest(createDepartmentSchema),
  DepartmentPositionController.createDepartment
);

router.get(
  "/departments",
  auth([Role.ADMIN, Role.HR, Role.EMPLOYEE]),
  DepartmentPositionController.getAllDepartments
);

router.patch(
  "/departments/:id",
  auth([Role.ADMIN, Role.HR]),
  validateRequest(updateDepartmentSchema),
  DepartmentPositionController.updateDepartment
);

router.delete(
  "/departments/:id",
  auth([Role.ADMIN]),
  DepartmentPositionController.deleteDepartment
);

// ================= POSITION ROUTES =================
router.post(
  "/positions",
  auth([Role.ADMIN, Role.HR]),
  validateRequest(createPositionSchema),
  DepartmentPositionController.createPosition
);

router.get(
  "/positions",
  auth([Role.ADMIN, Role.HR, Role.EMPLOYEE]),
  DepartmentPositionController.getAllPositions
);

router.patch(
  "/positions/:id",
  auth([Role.ADMIN, Role.HR]),
  validateRequest(updatePositionSchema),
  DepartmentPositionController.updatePosition
);

router.delete(
  "/positions/:id",
  auth([Role.ADMIN]),
  DepartmentPositionController.deletePosition
);

export const DepartmentPositionRoutes = router;