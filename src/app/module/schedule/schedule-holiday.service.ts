import status from "http-status";
import AppError from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma";
import {
  ICreateWorkSchedulePayload,
  IUpdateWorkSchedulePayload,
  ICreateHolidayPayload,
  IUpdateHolidayPayload,
} from "./schedule-holiday.interface";

// ================= WORK SCHEDULE SERVICES =================

const createWorkSchedule = async (payload: ICreateWorkSchedulePayload) => {
  const isExist = await prisma.workSchedule.findUnique({
    where: { name: payload.name },
  });

  if (isExist) {
    throw new AppError(status.CONFLICT, "Work schedule with this name already exists!");
  }

  return await prisma.workSchedule.create({
    data: payload,
  });
};

const getAllWorkSchedules = async () => {
  return await prisma.workSchedule.findMany({
    include: {
      _count: { select: { employees: true } },
    },
  });
};

const updateWorkSchedule = async (id: string, payload: IUpdateWorkSchedulePayload) => {
  const isExist = await prisma.workSchedule.findUnique({ where: { id } });

  if (!isExist) {
    throw new AppError(status.NOT_FOUND, "Work schedule not found!");
  }

  return await prisma.workSchedule.update({
    where: { id },
    data: payload,
  });
};

const deleteWorkSchedule = async (id: string) => {
  const isExist = await prisma.workSchedule.findUnique({
    where: { id },
    include: { _count: { select: { employees: true } } },
  });

  if (!isExist) {
    throw new AppError(status.NOT_FOUND, "Work schedule not found!");
  }

  if (isExist._count.employees > 0) {
    throw new AppError(status.BAD_REQUEST, "Cannot delete work schedule assigned to active employees!");
  }

  return await prisma.workSchedule.delete({ where: { id } });
};

// ================= HOLIDAY SERVICES =================

const createHoliday = async (payload: ICreateHolidayPayload) => {
  const holidayDate = new Date(payload.date);
  holidayDate.setHours(0, 0, 0, 0);

  const isExist = await prisma.holiday.findUnique({
    where: { date: holidayDate },
  });

  if (isExist) {
    throw new AppError(status.CONFLICT, "A holiday is already added for this date!");
  }

  return await prisma.holiday.create({
    data: {
      ...payload,
      date: holidayDate,
    },
  });
};

const getAllHolidays = async () => {
  return await prisma.holiday.findMany({
    orderBy: { date: "asc" },
  });
};

const updateHoliday = async (id: string, payload: IUpdateHolidayPayload) => {
  const isExist = await prisma.holiday.findUnique({ where: { id } });

  if (!isExist) {
    throw new AppError(status.NOT_FOUND, "Holiday not found!");
  }

  return await prisma.holiday.update({
    where: { id },
    data: {
      ...payload,
      date: payload.date ? new Date(payload.date) : undefined,
    },
  });
};

const deleteHoliday = async (id: string) => {
  const isExist = await prisma.holiday.findUnique({ where: { id } });

  if (!isExist) {
    throw new AppError(status.NOT_FOUND, "Holiday not found!");
  }

  return await prisma.holiday.delete({ where: { id } });
};

export const ScheduleHolidayService = {
  createWorkSchedule,
  getAllWorkSchedules,
  updateWorkSchedule,
  deleteWorkSchedule,
  createHoliday,
  getAllHolidays,
  updateHoliday,
  deleteHoliday,
};