import { AttendanceStatus } from "../../../generated/prisma/enums";

export interface ICheckInPayload {
  notes?: string;
  checkInIp?: string;
}

export interface ICheckOutPayload {
  notes?: string;
  checkOutIp?: string;
}

export interface IAttendanceQuery {
  page?: string;
  limit?: string;
  startDate?: string;
  endDate?: string;
  status?: AttendanceStatus;
  employeeId?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}