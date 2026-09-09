import { Router } from "express";
import { AuthRouters } from "../module/auth/auth.route";

const router=Router()
router.use("/v1/auth",AuthRouters)

export const IndexRouter=router