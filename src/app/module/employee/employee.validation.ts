import { z } from "zod";
import { Gender, EmploymentType } from "../../../generated/prisma/enums";

export const createEmployeeSchema = z.object({
  firstName: z.string().min(1, "First name cannot be empty"),
  lastName: z.string().min(1, "Last name cannot be empty"),
  phone: z.string().optional(),
  gender: z.nativeEnum(Gender).optional(),
  dateOfBirth: z.string().datetime().or(z.date()).optional(),
  joiningDate: z.string().datetime().or(z.date()),
  
});

export const updateEmployeeSchema = createEmployeeSchema
  .partial()

export const employeeQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  searchTerm: z.string().optional(),
  departmentId: z.string().uuid().optional(),
  positionId: z.string().uuid().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});