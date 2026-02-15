import { Router } from "express";
import { getActivities } from "./activity.controller";
import { authorize } from "../../middlewares/rbac";
import { authenticate } from "../../middlewares/auth";

const router = Router();

router.use(authenticate);
router.get("/", authorize("ADMIN", "MANAGER"), getActivities);

export default router;
