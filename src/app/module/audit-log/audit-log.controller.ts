import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { AuditLogService } from "./audit-log.service";

const getAllLogs = catchAsync(async (req: Request, res: Response) => {
  const result = await AuditLogService.getAllLogs(req.query);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Audit logs fetched successfully",
    data: result.data,
  });
});

export const AuditLogController = {
  getAllLogs,
};