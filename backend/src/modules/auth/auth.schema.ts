import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.email().toLowerCase(),
  password: z
    .string()
    .min(8)
    .max(128)
    .regex(/[A-Z]/, "Password must include uppercase letter")
    .regex(/[a-z]/, "Password must include lowercase letter")
    .regex(/[0-9]/, "Password must include number"),
  role: z.enum(["ADMIN", "MANAGER", "VIEWER"]).optional(),
});

export const loginSchema = z.object({
  email: z.email().toLowerCase(),
  password: z.string().min(8).max(128),
});
