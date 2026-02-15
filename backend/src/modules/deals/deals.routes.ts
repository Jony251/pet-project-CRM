import { Router } from "express";
import { authenticate } from "../../middlewares/auth";
import { authorize } from "../../middlewares/rbac";
import { validate } from "../../middlewares/validate";
import {
  getDeal,
  getDeals,
  getPipeline,
  patchDeal,
  patchDealStatus,
  postDeal,
  postDealComment,
  removeDeal,
} from "./deals.controller";
import {
  dealCommentSchema,
  dealPayloadSchema,
  dealStatusSchema,
  dealUpdateSchema,
} from "./deals.schema";

const router = Router();

router.use(authenticate);

router.get("/", authorize("ADMIN", "MANAGER", "VIEWER"), getDeals);
router.get("/pipeline", authorize("ADMIN", "MANAGER", "VIEWER"), getPipeline);
router.get("/:id", authorize("ADMIN", "MANAGER", "VIEWER"), getDeal);
router.post("/", authorize("ADMIN", "MANAGER"), validate({ body: dealPayloadSchema }), postDeal);
router.patch("/:id", authorize("ADMIN", "MANAGER"), validate({ body: dealUpdateSchema }), patchDeal);
router.patch(
  "/:id/status",
  authorize("ADMIN", "MANAGER"),
  validate({ body: dealStatusSchema }),
  patchDealStatus
);
router.delete("/:id", authorize("ADMIN", "MANAGER"), removeDeal);
router.post(
  "/:id/comments",
  authorize("ADMIN", "MANAGER"),
  validate({ body: dealCommentSchema }),
  postDealComment
);

export default router;
