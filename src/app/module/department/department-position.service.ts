import status from "http-status";
import AppError from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma";
import {
  ICreateDepartmentPayload,
  IUpdateDepartmentPayload,
  ICreatePositionPayload,
  IUpdatePositionPayload,
} from "./department-position.interface";

// ================= DEPARTMENT SERVICES =================

const createDepartment = async (payload: ICreateDepartmentPayload) => {
  const isExist = await prisma.department.findFirst({
    where: {
      OR: [{ name: payload.name }, { code: payload.code }],
    },
  });

  if (isExist) {
    throw new AppError(status.CONFLICT, "Department with this name or code already exists!");
  }

  return await prisma.department.create({ data: payload });
};

const getAllDepartments = async () => {
  return await prisma.department.findMany({
    include: {
      positions: true,
      _count: { select: { employees: true } },
    },
  });
};

const updateDepartment = async (id: string, payload: IUpdateDepartmentPayload) => {
  const department = await prisma.department.findUnique({ where: { id } });
  if (!department) {
    throw new AppError(status.NOT_FOUND, "Department not found!");
  }

  return await prisma.department.update({
    where: { id },
    data: payload,
  });
};

const deleteDepartment = async (id: string) => {
  const department = await prisma.department.findUnique({ where: { id } });
  if (!department) {
    throw new AppError(status.NOT_FOUND, "Department not found!");
  }

  return await prisma.department.delete({ where: { id } });
};

// ================= POSITION SERVICES =================

const createPosition = async (payload: ICreatePositionPayload) => {
  const department = await prisma.department.findUnique({
    where: { id: payload.departmentId },
  });

  if (!department) {
    throw new AppError(status.NOT_FOUND, "Department not found!");
  }

  const isExist = await prisma.position.findUnique({
    where: {
      title_departmentId: {
        title: payload.title,
        departmentId: payload.departmentId,
      },
    },
  });

  if (isExist) {
    throw new AppError(status.CONFLICT, "Position title already exists in this department!");
  }

  return await prisma.position.create({
    data: payload,
    include: { department: true },
  });
};

const getAllPositions = async () => {
  return await prisma.position.findMany({
    include: {
      department: true,
      _count: { select: { employees: true } },
    },
  });
};

const updatePosition = async (id: string, payload: IUpdatePositionPayload) => {
  const position = await prisma.position.findUnique({ where: { id } });
  if (!position) {
    throw new AppError(status.NOT_FOUND, "Position not found!");
  }

  return await prisma.position.update({
    where: { id },
    data: payload,
    include: { department: true },
  });
};

const deletePosition = async (id: string) => {
  const position = await prisma.position.findUnique({ where: { id } });
  if (!position) {
    throw new AppError(status.NOT_FOUND, "Position not found!");
  }

  return await prisma.position.delete({ where: { id } });
};

export const DepartmentPositionService = {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
  createPosition,
  getAllPositions,
  updatePosition,
  deletePosition,
};