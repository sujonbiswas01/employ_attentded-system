import { Gender, EmploymentType } from "../../../generated/prisma/enums";

export interface ICreateEmployeePayload {
  userId?: string;

  firstName: string;

  lastName: string;

  phone?: string;

  gender?: Gender;

  dateOfBirth?: string | Date;

  joiningDate: string | Date;

  departmentName: string;

  title: string;

  employmentType?: EmploymentType;

  workScheduleId?: string;
}

export interface IUpdateEmployeePayload extends Partial<Omit<ICreateEmployeePayload, "userId" | "employeeId">> {}

export interface IEmployeeQuery {
  page?: string;
  limit?: string;
  searchTerm?: string;
  departmentId?: string;
  positionId?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}