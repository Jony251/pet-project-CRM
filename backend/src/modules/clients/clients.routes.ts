import { Router } from "express";
import { authenticate } from "../../middlewares/auth";
import { authorize } from "../../middlewares/rbac";
import { validate } from "../../middlewares/validate";
import {
  getClient,
  getClients,
  patchClient,
  postClient,
  postInteraction,
  removeClient,
} from "./clients.controller";
import { clientPayloadSchema, clientUpdateSchema, interactionSchema } from "./clients.schema";

const router = Router();

router.use(authenticate);

router.get("/", authorize("ADMIN", "MANAGER", "VIEWER"), getClients);
router.get("/:id", authorize("ADMIN", "MANAGER", "VIEWER"), getClient);
router.post("/", authorize("ADMIN", "MANAGER"), validate({ body: clientPayloadSchema }), postClient);
router.patch("/:id", authorize("ADMIN", "MANAGER"), validate({ body: clientUpdateSchema }), patchClient);
router.delete("/:id", authorize("ADMIN", "MANAGER"), removeClient);
router.post(
  "/:id/interactions",
  authorize("ADMIN", "MANAGER"),
  validate({ body: interactionSchema }),
  postInteraction
);

export default router;
