import { z } from "zod";
import { AuditAction } from "../../../generated/prisma/enums";

export const createAuditLogSchema = z.object({
  userId: z.string().uuid("Invalid User ID format").optional(),
  action: z.nativeEnum(AuditAction),
  details: z.string().min(1),
  ipAddress: z.string().optional(),
});

export const auditLogQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  userId: z.string().uuid().optional(),
  action: z.nativeEnum(AuditAction).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  searchTerm: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});