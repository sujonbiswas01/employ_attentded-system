import { LeaveType, LeaveStatus } from "../../../generated/prisma/enums";

export interface ICreateLeaveRequestPayload {
  leaveType: LeaveType;
  startDate: string | Date;
  endDate: string | Date;
  reason: string;
}

export interface IUpdateLeaveStatusPayload {
  status: LeaveStatus;
  adminRemarks?: string;
}

export interface ILeaveRequestQuery {
  page?: string;
  limit?: string;
  status?: LeaveStatus;
  leaveType?: LeaveType;
  employeeId?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}