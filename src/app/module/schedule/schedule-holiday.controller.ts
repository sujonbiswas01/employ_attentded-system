import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { ScheduleHolidayService } from "./schedule-holiday.service";

// Work Schedule Controllers
const createWorkSchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleHolidayService.createWorkSchedule(req.body);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Work schedule created successfully",
    data: result,
  });
});

const getAllWorkSchedules = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleHolidayService.getAllWorkSchedules();

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Work schedules fetched successfully",
    data: result,
  });
});

const updateWorkSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ScheduleHolidayService.updateWorkSchedule(id as string, req.body);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Work schedule updated successfully",
    data: result,
  });
});

const deleteWorkSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ScheduleHolidayService.deleteWorkSchedule(id as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Work schedule deleted successfully",
    data: result,
  });
});

// Holiday Controllers
const createHoliday = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleHolidayService.createHoliday(req.body);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Holiday created successfully",
    data: result,
  });
});

const getAllHolidays = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleHolidayService.getAllHolidays();

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Holidays fetched successfully",
    data: result,
  });
});

const updateHoliday = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ScheduleHolidayService.updateHoliday(id as string, req.body);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Holiday updated successfully",
    data: result,
  });
});

const deleteHoliday = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ScheduleHolidayService.deleteHoliday(id as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Holiday deleted successfully",
    data: result,
  });
});

export const ScheduleHolidayController = {
  createWorkSchedule,
  getAllWorkSchedules,
  updateWorkSchedule,
  deleteWorkSchedule,
  createHoliday,
  getAllHolidays,
  updateHoliday,
  deleteHoliday,
};