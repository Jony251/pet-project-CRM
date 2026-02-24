import { Router } from "express";
import { authenticate } from "../../middlewares/auth";
import * as ctrl from "./conversations.controller";
const router = Router();
router.use(authenticate);
router.get("/", ctrl.list);
router.get("/:id/messages", ctrl.messages);
router.post("/:id/messages", ctrl.send);
export default router;
