import { Router } from "express";
import { AuditLogController } from "./audit-log.controller";
import auth from "../../middleware/Auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// সিস্টেমের সমস্ত Audit Log দেখার রাউট (শুধুমাত্র Super Admin বা System Admin-এর জন্য)
router.get(
  "/",
  auth([Role.ADMIN]),
  AuditLogController.getAllLogs
);

export const AuditLogRoutes = router;