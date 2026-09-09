import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { LeaveRequestService } from "./leave-request.interface.service";

const createLeaveRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await LeaveRequestService.createLeaveRequest(req.user, req.body);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Leave request submitted successfully",
    data: result,
  });
});

const getMyLeaveRequests = catchAsync(async (req: Request, res: Response) => {
  const result = await LeaveRequestService.getMyLeaveRequests(req.user, req.query);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "My leave requests fetched successfully",
    data: result.data,
  });
});

const getAllLeaveRequests = catchAsync(async (req: Request, res: Response) => {
  const result = await LeaveRequestService.getAllLeaveRequests(req.query);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "All leave requests fetched successfully",
    data: result.data,
  });
});

const updateLeaveStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await LeaveRequestService.updateLeaveStatus(req.user, id as string, req.body);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: `Leave request status updated to ${req.body.status}`,
    data: result,
  });
});

export const LeaveRequestController = {
  createLeaveRequest,
  getMyLeaveRequests,
  getAllLeaveRequests,
  updateLeaveStatus,
};