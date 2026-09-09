import { AuditAction } from "../../../generated/prisma/enums";

export interface ICreateAuditLogPayload {
  userId?: string;
  action: AuditAction;
  details: string;
  ipAddress?: string;
}

export interface IAuditLogQuery {
  page?: string;
  limit?: string;
  userId?: string;
  action?: AuditAction;
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}