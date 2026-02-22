import { Router } from "express";
import { authenticate } from "../../middlewares/auth";
import * as ctrl from "./customers.controller";

const router = Router();
router.use(authenticate);
router.get("/", ctrl.list);
router.get("/:id", ctrl.getById);
router.post("/", ctrl.create);
router.patch("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);
export default router;
