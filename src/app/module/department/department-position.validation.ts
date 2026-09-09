import { z } from "zod";

// Department Schemas
export const createDepartmentSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  description: z.string().optional(),
});

export const updateDepartmentSchema = createDepartmentSchema.partial();

// Position Schemas
export const createPositionSchema = z.object({
  title: z.string().min(1),
  departmentId: z.string().uuid("Invalid Department ID"),
});

export const updatePositionSchema = createPositionSchema.partial();