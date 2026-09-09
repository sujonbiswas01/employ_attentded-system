import { z } from "zod";

// HH:mm সময় ফরম্যাট চেক করার রিজেক্স
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

// Work Schedule Schemas
export const createWorkScheduleSchema = z.object({
  name: z.string().min(1),
  startTime: z.string().regex(timeRegex, "Invalid time format. Use HH:mm (e.g. 09:00)"),
  endTime: z.string().regex(timeRegex, "Invalid time format. Use HH:mm (e.g. 17:00)"),
  graceMinutes: z.number().int().nonnegative().optional(),
  workDays: z
    .array(z.number().int().min(1, "Day must be between 1 and 7").max(7, "Day must be between 1 and 7"))
    .min(1, "At least one work day must be selected"),
});

export const updateWorkScheduleSchema = createWorkScheduleSchema.partial();

// Holiday Schemas
export const createHolidaySchema = z.object({
  title: z.string().min(1),
  date: z.string().datetime().or(z.date()),
  description: z.string().optional(),
});

export const updateHolidaySchema = createHolidaySchema.partial();