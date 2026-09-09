import { Router } from "express";
import { AuthRouters } from "../module/auth/auth.route";
import { EmployeeRoutes } from "../module/employee/employee.route";
import { AttendanceRoutes } from "../module/attendance/attendance.route";
import { DepartmentPositionRoutes } from "../module/department/department-position.route";
import { LeaveRequestRoutes } from "../module/leave/leave-request.route";

const router=Router()
router.use("/v1/employee",EmployeeRoutes)
router.use("/v1/attendance",AttendanceRoutes)
router.use("/v1/auth",AuthRouters)
router.use("/v1/department",DepartmentPositionRoutes)
router.use("/v1/leave",LeaveRequestRoutes)

export const IndexRouter=router