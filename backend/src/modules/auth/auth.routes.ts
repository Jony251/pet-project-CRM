import { Router } from "express";
import { login, me, register } from "./auth.controller";
import { validate } from "../../middlewares/validate";
import { loginSchema, registerSchema } from "./auth.schema";
import { authenticate } from "../../middlewares/auth";

const router = Router();

router.post("/register", validate({ body: registerSchema }), register);
router.post("/login", validate({ body: loginSchema }), login);
router.get("/me", authenticate, me);

export default router;
