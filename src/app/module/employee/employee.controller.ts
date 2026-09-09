import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { EmployeeService } from "./employee.service";

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await EmployeeService.getMyProfile(req.user);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Profile retrieved successfully",
    data: result,
  });
});

const createEmployeeProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await EmployeeService.createEmployeeProfile(req.user, req.body);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Employee profile created successfully",
    data: result,
  });
});

const getAllEmployees = catchAsync(async (req: Request, res: Response) => {
  const result = await EmployeeService.getAllEmployees(req.query);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Employees fetched successfully",
    data: result.data,
  });
});

const updateEmployeeProfile = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EmployeeService.updateEmployeeProfile(id as string, req.body);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Employee profile updated successfully",
    data: result,
  });
});

export const EmployeeController = {
  getMyProfile,
  createEmployeeProfile,
  getAllEmployees,
  updateEmployeeProfile,
};