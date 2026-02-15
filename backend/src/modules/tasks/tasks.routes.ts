import { Router } from "express";
import { authenticate } from "../../middlewares/auth";
import { authorize } from "../../middlewares/rbac";
import { validate } from "../../middlewares/validate";
import {
  getTask,
  getTasks,
  patchTask,
  patchTaskStatus,
  postTask,
  removeTask,
} from "./tasks.controller";
import { taskPayloadSchema, taskStatusSchema, taskUpdateSchema } from "./tasks.schema";

const router = Router();

router.use(authenticate);

router.get("/", authorize("ADMIN", "MANAGER", "VIEWER"), getTasks);
router.get("/:id", authorize("ADMIN", "MANAGER", "VIEWER"), getTask);
router.post("/", authorize("ADMIN", "MANAGER"), validate({ body: taskPayloadSchema }), postTask);
router.patch("/:id", authorize("ADMIN", "MANAGER"), validate({ body: taskUpdateSchema }), patchTask);
router.patch(
  "/:id/status",
  authorize("ADMIN", "MANAGER"),
  validate({ body: taskStatusSchema }),
  patchTaskStatus
);
router.delete("/:id", authorize("ADMIN", "MANAGER"), removeTask);

export default router;
