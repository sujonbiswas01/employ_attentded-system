import { prisma } from "../../lib/prisma";
import { ICreateAuditLogPayload, IAuditLogQuery } from "./audit-log.interface";
import paginationSortingHelper from "../../helpers/Pagination";

// ১. Audit Log তৈরি করার ইউটিলিটি সার্ভিস (অন্যান্য সার্ভিস থেকে কল করার জন্য)
const createLog = async (payload: ICreateAuditLogPayload) => {
  return await prisma.auditLog.create({
    data: payload,
  });
};

// ২. সব Audit Log দেখার সার্ভিস (Pagination, Search ও Date Filtering সহ)
const getAllLogs = async (query: IAuditLogQuery) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(query);
  const { userId, action, startDate, endDate, searchTerm } = query;

  const whereConditions: any = {};

  if (userId) whereConditions.userId = userId;
  if (action) whereConditions.action = action;

  if (startDate && endDate) {
    whereConditions.createdAt = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    };
  }

  if (searchTerm) {
    whereConditions.OR = [
      { details: { contains: searchTerm, mode: "insensitive" } },
      { ipAddress: { contains: searchTerm, mode: "insensitive" } },
      { user: { email: { contains: searchTerm, mode: "insensitive" } } },
    ];
  }

  const [data, total] = await Promise.all([
    prisma.auditLog.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: { [sortBy || "createdAt"]: sortOrder || "desc" },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            employeeProfile: {
              select: { firstName: true, lastName: true, employeeId: true },
            },
          },
        },
      },
    }),
    prisma.auditLog.count({ where: whereConditions }),
  ]);

  return {
    meta: { page, limit, total, totalPage: Math.ceil(total / limit) },
    data,
  };
};

export const AuditLogService = {
  createLog,
  getAllLogs,
};