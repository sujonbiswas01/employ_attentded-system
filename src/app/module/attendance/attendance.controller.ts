import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { AttendanceService } from "./attendance.service";

const checkIn = catchAsync(async (req: Request, res: Response) => {
  const result = await AttendanceService.checkIn(req.user, req.body);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Checked in successfully",
    data: result,
  });
});

const checkOut = catchAsync(async (req: Request, res: Response) => {
  const result = await AttendanceService.checkOut(req.user, req.body);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Checked out successfully",
    data: result,
  });
});

const getMyAttendanceHistory = catchAsync(async (req: Request, res: Response) => {
  const result = await AttendanceService.getMyAttendanceHistory(req.user, req.query);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Attendance history retrieved successfully",
    data: result.data,
  });
});

export const AttendanceController = {
  checkIn,
  checkOut,
  getMyAttendanceHistory,
};