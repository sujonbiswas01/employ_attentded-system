import { z } from "zod";
import { AttendanceStatus } from "../../../generated/prisma/enums";

export const checkInSchema = z.object({
  notes: z.string().optional(),
  checkInIp: z.string().optional(),
});

export const checkOutSchema = z.object({
  notes: z.string().optional(),
  checkOutIp: z.string().optional(),
});

export const attendanceQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.nativeEnum(AttendanceStatus).optional(),
  employeeId: z.string().uuid().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});