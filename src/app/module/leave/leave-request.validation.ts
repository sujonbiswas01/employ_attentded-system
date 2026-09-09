import { z } from "zod";
import { LeaveType, LeaveStatus } from "../../../generated/prisma/enums";

export const createLeaveRequestSchema = z.object({
  leaveType: z.nativeEnum(LeaveType),
  startDate: z.string().datetime().or(z.date()),
  endDate: z.string().datetime().or(z.date()),
  reason: z.string().min(5, "Reason must be at least 5 characters long"),
});

export const updateLeaveStatusSchema = z.object({
  status: z.enum([LeaveStatus.APPROVED, LeaveStatus.REJECTED, LeaveStatus.PENDING]),
  adminRemarks: z.string().optional(),
});

export const leaveRequestQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  status: z.nativeEnum(LeaveStatus).optional(),
  leaveType: z.nativeEnum(LeaveType).optional(),
  employeeId: z.string().uuid().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});