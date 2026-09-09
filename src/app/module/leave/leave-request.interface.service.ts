import status from "http-status";
import AppError from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma";
import { IRequestUser } from "../../interface/requestUser.interface";
import {
  ICreateLeaveRequestPayload,
  IUpdateLeaveStatusPayload,
  ILeaveRequestQuery,
} from "./leave-request.interface";
import paginationSortingHelper from "../../helpers/Pagination";
import { LeaveStatus } from "../../../generated/prisma/enums";

// ১. ছুটির আবেদন তৈরি করা
const createLeaveRequest = async (user: IRequestUser, payload: ICreateLeaveRequestPayload) => {
  if (!user?.userId) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access. Please login first.");
  }

  const employee = await prisma.employeeProfile.findUnique({
    where: { userId: user.userId },
  });

  if (!employee) {
    throw new AppError(status.NOT_FOUND, "Employee profile not found!");
  }

  const start = new Date(payload.startDate);
  const end = new Date(payload.endDate);

  if (start > end) {
    throw new AppError(status.BAD_REQUEST, "Start date cannot be after end date!");
  }

  // মোট দিনের সংখ্যা গণনা (শুরু এবং শেষ উভয় দিন অন্তর্ভূক্ত)
  const timeDiff = Math.abs(end.getTime() - start.getTime());
  const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

  // তারিখের Overlap চেক করা
  const existingLeave = await prisma.leaveRequest.findFirst({
    where: {
      employeeId: employee.id,
      status: { in: [LeaveStatus.PENDING, LeaveStatus.APPROVED] },
      OR: [
        { startDate: { lte: end }, endDate: { gte: start } },
      ],
    },
  });

  if (existingLeave) {
    throw new AppError(status.CONFLICT, "You already have a pending or approved leave request during this date range!");
  }

  return await prisma.leaveRequest.create({
    data: {
      employeeId: employee.id,
      leaveType: payload.leaveType,
      startDate: start,
      endDate: end,
      totalDays,
      reason: payload.reason,
    },
    include: {
      employee: { select: { id: true, firstName: true, lastName: true, employeeId: true } },
    },
  });
};

// ২. নিজের ছুটির আবেদন দেখা
const getMyLeaveRequests = async (user: IRequestUser, query: ILeaveRequestQuery) => {
  if (!user?.userId) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access. Please login first.");
  }

  const employee = await prisma.employeeProfile.findUnique({
    where: { userId: user.userId },
  });

  if (!employee) {
    throw new AppError(status.NOT_FOUND, "Employee profile not found!");
  }

  const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(query);
  const { status: leaveStatus, leaveType } = query;

  const whereConditions: any = { employeeId: employee.id };

  if (leaveStatus) whereConditions.status = leaveStatus;
  if (leaveType) whereConditions.leaveType = leaveType;

  const [data, total] = await Promise.all([
    prisma.leaveRequest.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      include: {
        approvedBy: { select: { id: true, email: true, role: true } },
      },
    }),
    prisma.leaveRequest.count({ where: whereConditions }),
  ]);

  return {
    meta: { page, limit, total, totalPage: Math.ceil(total / limit) },
    data,
  };
};

// ৩. সব ছুটির আবেদন দেখা (HR/Admin এর জন্য)
const getAllLeaveRequests = async (query: ILeaveRequestQuery) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(query);
  const { status: leaveStatus, leaveType, employeeId } = query;

  const whereConditions: any = {};

  if (leaveStatus) whereConditions.status = leaveStatus;
  if (leaveType) whereConditions.leaveType = leaveType;
  if (employeeId) whereConditions.employeeId = employeeId;

  const [data, total] = await Promise.all([
    prisma.leaveRequest.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            employeeId: true,
            department: { select: { name: true } },
          },
        },
        approvedBy: { select: { id: true, email: true, role: true } },
      },
    }),
    prisma.leaveRequest.count({ where: whereConditions }),
  ]);

  return {
    meta: { page, limit, total, totalPage: Math.ceil(total / limit) },
    data,
  };
};

// ৪. ছুটির আবেদন Approve বা Reject করা (HR/Admin)
const updateLeaveStatus = async (
  user: IRequestUser,
  requestId: string,
  payload: IUpdateLeaveStatusPayload
) => {
  if (!user?.userId) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access. Please login first.");
  }

  const leaveRequest = await prisma.leaveRequest.findUnique({
    where: { id: requestId },
  });

  if (!leaveRequest) {
    throw new AppError(status.NOT_FOUND, "Leave request not found!");
  }

  return await prisma.leaveRequest.update({
    where: { id: requestId },
    data: {
      status: payload.status,
      adminRemarks: payload.adminRemarks,
      approvedById: user.userId,
    },
    include: {
      employee: true,
      approvedBy: { select: { id: true, email: true, role: true } },
    },
  });
};

export const LeaveRequestService = {
  createLeaveRequest,
  getMyLeaveRequests,
  getAllLeaveRequests,
  updateLeaveStatus,
};