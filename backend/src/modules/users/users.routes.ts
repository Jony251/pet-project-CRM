import { Router } from "express";
import { authenticate } from "../../middlewares/auth";
import { authorize } from "../../middlewares/rbac";
import { validate } from "../../middlewares/validate";
import { getUsers, patchUserRole, postUser } from "./users.controller";
import { createUserSchema, updateUserRoleSchema } from "./users.schema";

const router = Router();

router.use(authenticate);

router.get("/", authorize("ADMIN", "MANAGER"), getUsers);
router.post("/", authorize("ADMIN"), validate({ body: createUserSchema }), postUser);
router.patch("/:id/role", authorize("ADMIN"), validate({ body: updateUserRoleSchema }), patchUserRole);

export default router;
