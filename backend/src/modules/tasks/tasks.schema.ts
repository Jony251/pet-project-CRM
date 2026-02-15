import { z } from "zod";

export const taskPayloadSchema = z.object({
  title: z.string().min(2).max(140),
  description: z.string().max(2000).optional(),
  deadline: z.iso.datetime().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE", "BLOCKED"]).optional(),
  assignedUserId: z.string().min(1),
});

export const taskUpdateSchema = taskPayloadSchema.partial();

export const taskStatusSchema = z.object({
  status: z.enum(["TODO", "IN_PROGRESS", "DONE", "BLOCKED"]),
});
