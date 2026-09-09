import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { DepartmentPositionService } from "./department-position.service";

// Department Controllers
const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await DepartmentPositionService.createDepartment(req.body);
  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Department created successfully",
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const result = await DepartmentPositionService.getAllDepartments();
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Departments fetched successfully",
    data: result,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await DepartmentPositionService.updateDepartment(req.params.id as string, req.body);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Department updated successfully",
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await DepartmentPositionService.deleteDepartment(req.params.id as string);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Department deleted successfully",
    data: result,
  });
});

// Position Controllers
const createPosition = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body,"nsdf")
  const result = await DepartmentPositionService.createPosition(req.body);
  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Position created successfully",
    data: result,
  });
});

const getAllPositions = catchAsync(async (req: Request, res: Response) => {
  const result = await DepartmentPositionService.getAllPositions();
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Positions fetched successfully",
    data: result,
  });
});

const updatePosition = catchAsync(async (req: Request, res: Response) => {
  const result = await DepartmentPositionService.updatePosition(req.params.id as string, req.body);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Position updated successfully",
    data: result,
  });
});

const deletePosition = catchAsync(async (req: Request, res: Response) => {
  const result = await DepartmentPositionService.deletePosition(req.params.id as string);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Position deleted successfully",
    data: result,
  });
});

export const DepartmentPositionController = {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
  createPosition,
  getAllPositions,
  updatePosition,
  deletePosition,
};