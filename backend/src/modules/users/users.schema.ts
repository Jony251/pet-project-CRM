import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.email().toLowerCase(),
  password: z.string().min(8).max(128),
  role: z.enum(["ADMIN", "MANAGER", "VIEWER"]),
});

export const updateUserRoleSchema = z.object({
  role: z.enum(["ADMIN", "MANAGER", "VIEWER"]),
});
