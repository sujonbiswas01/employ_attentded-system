// Work Schedule Interfaces
export interface ICreateWorkSchedulePayload {
  name: string;
  startTime: string;
  endTime: string;
  graceMinutes?: number;
  workDays: number[];
}

export interface IUpdateWorkSchedulePayload extends Partial<ICreateWorkSchedulePayload> {}

// Holiday Interfaces
export interface ICreateHolidayPayload {
  title: string;
  date: string | Date;
  description?: string;
}

export interface IUpdateHolidayPayload extends Partial<ICreateHolidayPayload> {}