import status from "http-status";
import AppError from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma";
import { IRequestUser } from "../../interface/requestUser.interface";
import { ICheckInPayload, ICheckOutPayload, IAttendanceQuery } from "./attendance.interface";
import paginationSortingHelper from "../../helpers/Pagination";
import { AttendanceStatus } from "../../../generated/prisma/enums";

// ১. Daily Check-In
const checkIn = async (user: IRequestUser, payload: ICheckInPayload) => {
  if (!user?.userId) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access. Please login first.");
  }

  const employee = await prisma.employeeProfile.findUnique({
    where: { userId: user.userId },
  });

  if (!employee) {
    throw new AppError(status.NOT_FOUND, "Employee profile not found!");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // আজকের অ্যাটেনডেন্স রেকর্ড চেক করা
  const existingAttendance = await prisma.attendance.findUnique({
    where: {
      employeeId_date: {
        employeeId: employee.id,
        date: today,
      },
    },
  });

  if (existingAttendance?.checkIn) {
    throw new AppError(status.BAD_REQUEST, "You have already checked in today!");
  }

  const now = new Date();
  
  // Late Minutes হিসাব করা (ডিফল্ট অফিস টাইম সকাল ৯:০০ ধরে হিসাব করা হয়েছে)
  const officeStartTime = new Date();
  officeStartTime.setHours(9, 0, 0, 0);

  let lateMinutes = 0;
  let attendanceStatus: AttendanceStatus = AttendanceStatus.PRESENT;

  if (now > officeStartTime) {
    lateMinutes = Math.floor((now.getTime() - officeStartTime.getTime()) / (1000 * 60));
    attendanceStatus = AttendanceStatus.LATE;
  }

  return await prisma.attendance.upsert({
    where: {
      employeeId_date: {
        employeeId: employee.id,
        date: today,
      },
    },
    update: {
      checkIn: now,
      status: attendanceStatus,
      lateMinutes,
      checkInIp: payload.checkInIp,
      notes: payload.notes,
    },
    create: {
      employeeId: employee.id,
      date: today,
      checkIn: now,
      status: attendanceStatus,
      lateMinutes,
      checkInIp: payload.checkInIp,
      notes: payload.notes,
    },
  });
};

// ২. Daily Check-Out
const checkOut = async (user: IRequestUser, payload: ICheckOutPayload) => {
  if (!user?.userId) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access. Please login first.");
  }

  const employee = await prisma.employeeProfile.findUnique({
    where: { userId: user.userId },
  });

  if (!employee) {
    throw new AppError(status.NOT_FOUND, "Employee profile not found!");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const attendance = await prisma.attendance.findUnique({
    where: {
      employeeId_date: {
        employeeId: employee.id,
        date: today,
      },
    },
  });

  if (!attendance || !attendance.checkIn) {
    throw new AppError(status.BAD_REQUEST, "You cannot check out without checking in first!");
  }

  if (attendance.checkOut) {
    throw new AppError(status.BAD_REQUEST, "You have already checked out today!");
  }

  const checkOutTime = new Date();
  
  // Working Hours গণনাকরণ (ঘণ্টায়)
  const diffInMs = checkOutTime.getTime() - new Date(attendance.checkIn).getTime();
  const totalHours = parseFloat((diffInMs / (1000 * 60 * 60)).toFixed(2));

  // Overtime Hours হিসাব করা (৮ ঘণ্টার বেশি কাজ করলে)
  const standardWorkHours = 8.0;
  const overtimeHours = totalHours > standardWorkHours ? parseFloat((totalHours - standardWorkHours).toFixed(2)) : 0.0;

  return await prisma.attendance.update({
    where: { id: attendance.id },
    data: {
      checkOut: checkOutTime,
      workingHours: totalHours,
      overtimeHours,
      checkOutIp: payload.checkOutIp,
      notes: payload.notes ? `${attendance.notes || ""} | Out Note: ${payload.notes}` : attendance.notes,
    },
  });
};

// ৩. নিজের Attendance History দেখা
const getMyAttendanceHistory = async (user: IRequestUser, query: IAttendanceQuery) => {
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
  const { startDate, endDate, status: attendanceStatus } = query;

  const whereConditions: any = { employeeId: employee.id };

  if (startDate && endDate) {
    whereConditions.date = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    };
  }

  if (attendanceStatus) {
    whereConditions.status = attendanceStatus;
  }

  const [data, total] = await Promise.all([
    prisma.attendance.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.attendance.count({ where: whereConditions }),
  ]);

  return {
    meta: { page, limit, total, totalPage: Math.ceil(total / limit) },
    data,
  };
};

export const AttendanceService = {
  checkIn,
  checkOut,
  getMyAttendanceHistory,
};