import { Router } from "express";
import { authenticate } from "../../middlewares/auth";
import { authorize } from "../../middlewares/rbac";
import { getDashboard, getRevenue } from "./analytics.controller";

const router = Router();

router.use(authenticate);

router.get("/dashboard", authorize("ADMIN", "MANAGER", "VIEWER"), getDashboard);
router.get("/revenue", authorize("ADMIN", "MANAGER", "VIEWER"), getRevenue);

export default router;
