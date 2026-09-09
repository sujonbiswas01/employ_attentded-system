import { z } from "zod";
import { Gender, EmploymentType } from "../../../generated/prisma/enums";

export const createEmployeeSchema = z.object({
  userId: z.string().uuid("Invalid User ID format").optional(),
  employeeId: z.string().min(1, "Employee ID cannot be empty"),
  firstName: z.string().min(1, "First name cannot be empty"),
  lastName: z.string().min(1, "Last name cannot be empty"),
  phone: z.string().optional(),
  gender: z.nativeEnum(Gender).optional(),
  dateOfBirth: z.string().datetime().or(z.date()).optional(),
  joiningDate: z.string().datetime().or(z.date()),
  departmentId: z.string().uuid("Invalid Department ID").optional(),
  positionId: z.string().uuid("Invalid Position ID").optional(),
  employmentType: z.nativeEnum(EmploymentType).optional(),
  workScheduleId: z.string().uuid("Invalid Work Schedule ID").optional(),
});

export const updateEmployeeSchema = createEmployeeSchema
  .partial()
  .omit({
    userId: true,
    employeeId: true,
  });

export const employeeQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  searchTerm: z.string().optional(),
  departmentId: z.string().uuid().optional(),
  positionId: z.string().uuid().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});