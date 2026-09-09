import { Router } from "express";
import { ScheduleHolidayController } from "./schedule-holiday.controller";
import auth from "../../middleware/Auth";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createWorkScheduleSchema,
  updateWorkScheduleSchema,
  createHolidaySchema,
  updateHolidaySchema,
} from "./schedule-holiday.validation";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// ================= WORK SCHEDULE ROUTES =================
router.post(
  "/work-schedule",
  auth([Role.ADMIN, Role.HR]),
  validateRequest(createWorkScheduleSchema),
  ScheduleHolidayController.createWorkSchedule
);

router.get(
  "/work-schedules",
  auth([Role.ADMIN, Role.HR, Role.EMPLOYEE]),
  ScheduleHolidayController.getAllWorkSchedules
);

router.patch(
  "/work-schedules/:id",
  auth([Role.ADMIN, Role.HR]),
  validateRequest(updateWorkScheduleSchema),
  ScheduleHolidayController.updateWorkSchedule
);

router.delete(
  "/work-schedules/:id",
  auth([Role.ADMIN]),
  ScheduleHolidayController.deleteWorkSchedule
);

// ================= HOLIDAY ROUTES =================
router.post(
  "/holidays",
  auth([Role.ADMIN, Role.HR]),
  validateRequest(createHolidaySchema),
  ScheduleHolidayController.createHoliday
);

router.get(
  "/holidays",
  auth([Role.ADMIN, Role.HR, Role.EMPLOYEE]),
  ScheduleHolidayController.getAllHolidays
);

router.patch(
  "/holidays/:id",
  auth([Role.ADMIN, Role.HR]),
  validateRequest(updateHolidaySchema),
  ScheduleHolidayController.updateHoliday
);

router.delete(
  "/holidays/:id",
  auth([Role.ADMIN, Role.HR]),
  ScheduleHolidayController.deleteHoliday
);

export const ScheduleHolidayRoutes = router;