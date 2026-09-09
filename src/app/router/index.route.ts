import { Router } from "express";
import { AuthRouters } from "../module/auth/auth.route";
import { EmployeeRoutes } from "../module/employee/employee.route";
import { AttendanceRoutes } from "../module/attendance/attendance.route";

const router=Router()
router.use("/v1/employee",EmployeeRoutes)
router.use("/v1/attendance",AttendanceRoutes)
router.use("/v1/auth",AuthRouters)

export const IndexRouter=router