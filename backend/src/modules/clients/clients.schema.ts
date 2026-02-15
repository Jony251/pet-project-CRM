import { z } from "zod";

export const clientPayloadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.email().toLowerCase(),
  phone: z.string().max(40).optional(),
  company: z.string().max(120).optional(),
  source: z.string().max(80).optional(),
  assignedManagerId: z.string().min(1).optional(),
});

export const clientUpdateSchema = clientPayloadSchema.partial();

export const interactionSchema = z.object({
  type: z.string().min(2).max(50),
  note: z.string().min(3).max(1000),
});
