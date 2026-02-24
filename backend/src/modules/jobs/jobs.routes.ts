import { Router } from "express";
import { authenticate } from "../../middlewares/auth";
import * as ctrl from "./jobs.controller";
const router = Router();
router.use(authenticate);
router.get("/", ctrl.list);
export default router;
