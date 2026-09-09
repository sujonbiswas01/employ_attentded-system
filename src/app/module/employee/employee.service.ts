import status from "http-status";
import AppError from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma";
import { IRequestUser } from "../../interface/requestUser.interface";
import { ICreateEmployeePayload, IUpdateEmployeePayload, IEmployeeQuery } from "./employee.interface";
import paginationSortingHelper from "../../helpers/Pagination";

// ১. নিজের প্রোফাইল ফেচ করা
const getMyProfile = async (user: IRequestUser) => {
  if (!user?.userId) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access. Please login first.");
  }

  const employee = await prisma.employeeProfile.findUnique({
    where: { userId: user.userId },
    include: {
      user: { select: { id: true, email: true, role: true } },
      department: true,
      position: true,
      workSchedule: true,
    },
  });

  if (!employee) {
    throw new AppError(status.NOT_FOUND, "Employee profile not found!");
  }

  return employee;
};

// ২. প্রোফাইল ক্রিয়েট করা
const createEmployeeProfile = async (user: IRequestUser, payload: ICreateEmployeePayload,r:any) => {
  if (!user?.userId) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized access. Please login first.");
  }

  // যদি body-তে userId না থাকে, তবে logged-in user এর ID ব্যবহৃত হবে
  const targetUserId = payload.userId || user.userId;
  const {...restPayload } = payload;
  const { departmentName ,title}=r



  // A. User একাউন্ট অস্তিত্বমান কিনা
  const userExist = await prisma.user.findUnique({
    where: { id: targetUserId },
    include: { employeeProfile: {select: {employeeId: true}} },
  });
  const id=userExist?.employeeProfile?.employeeId

  if (!userExist) {
    throw new AppError(status.NOT_FOUND, "User account not found!");
  }

  // B. আগে থেকেই Profile তৈরি করা আছে কিনা
  if (userExist.employeeProfile) {
    throw new AppError(status.CONFLICT, "Employee profile already exists for this user!");
  }
  
  // C. Employee ID ইউনিক কিনা চেক করা
  if (id) {
  const isEmpIdExist = await prisma.employeeProfile.findUnique({
    where: { employeeId:id },
  });
    if (isEmpIdExist) {
    throw new AppError(status.CONFLICT, "Employee ID already exists!");
  }
}


const department = await prisma.department.findUnique({
  where: {
    name: departmentName,
  },
  select: {
    id: true,
    name: true,
  },
});

if (!department) {
  throw new AppError(
    status.NOT_FOUND,
    `Department "${departmentName}" not found!`
  );
}

const departmentId = department.id;

const position = await prisma.position.findUnique({
  where: {
    title: title as any,
  },
  select: {
    id: true,
    title: true,
    departmentId: true,
  },
});

if (!position) {
  throw new AppError(
    status.NOT_FOUND,
    `Position "${title}" not found!`
  );
}

console.log(position)


const employeeId = `EMP-${Date.now()}`;

  // D. প্রোফাইল ডাটাবেজে সেভ করা
  return await prisma.employeeProfile.create({
    data: {
      userId: targetUserId,
      firstName: restPayload.firstName,
      lastName: restPayload.lastName,
      phone: restPayload.phone,
      gender: restPayload.gender,
      departmentId: departmentId,
      employeeId,
      positionId: position.id,
      dateOfBirth: restPayload.dateOfBirth ? new Date(restPayload.dateOfBirth) : undefined,
      joiningDate: new Date(restPayload.joiningDate),

    },
    include: {
      user: { select: { id: true, email: true, role: true } },
      department: true,
      position: true,
      workSchedule: true,
    },
  });
};

// ৩. সব Employee তালিকা দেখা (Search, Filter, Pagination সহ)
const getAllEmployees = async (query: IEmployeeQuery) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(query);
  const { searchTerm, departmentId, positionId } = query;

  const whereConditions: any = {};

  if (searchTerm) {
    whereConditions.OR = [
      { firstName: { contains: searchTerm, mode: "insensitive" } },
      { lastName: { contains: searchTerm, mode: "insensitive" } },
      { employeeId: { contains: searchTerm, mode: "insensitive" } },
      { phone: { contains: searchTerm, mode: "insensitive" } },
      { user: { email: { contains: searchTerm, mode: "insensitive" } } },
    ];
  }

  if (departmentId) whereConditions.departmentId = departmentId;
  if (positionId) whereConditions.positionId = positionId;

  const [data, total] = await Promise.all([
    prisma.employeeProfile.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      include: {
        user: { select: { id: true, email: true, role: true } },
        department: true,
        position: true,
        workSchedule: true,
      },
    }),
    prisma.employeeProfile.count({ where: whereConditions }),
  ]);

  return {
    meta: { page, limit, total, totalPage: Math.ceil(total / limit) },
    data,
  };
};

// ৪. নির্দিষ্ট ID এর Profile আপডেট করা
const updateEmployeeProfile = async (id: string, payload: IUpdateEmployeePayload) => {
  if (!id) {
    throw new AppError(status.BAD_REQUEST, "Employee Profile ID is required!");
  }

  const isExist = await prisma.employeeProfile.findUnique({ where: { id } });

  if (!isExist) {
    throw new AppError(status.NOT_FOUND, "Employee profile not found!");
  }

  return await prisma.employeeProfile.update({
    where: { id },
    data: {
      ...payload,
      dateOfBirth: payload.dateOfBirth ? new Date(payload.dateOfBirth) : undefined,
      joiningDate: payload.joiningDate ? new Date(payload.joiningDate) : undefined,
    },
    include: {
      department: true,
      position: true,
      workSchedule: true,
    },
  });
};

export const EmployeeService = {
  getMyProfile,
  createEmployeeProfile,
  getAllEmployees,
  updateEmployeeProfile,
};