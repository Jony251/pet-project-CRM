import { Router } from "express";
import { authenticate } from "../../middlewares/auth";
import * as ctrl from "./calendar.controller";
const router = Router();
router.use(authenticate);
router.get("/", ctrl.list);
router.post("/", ctrl.create);
export default router;
