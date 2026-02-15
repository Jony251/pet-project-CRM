import { z } from "zod";

export const dealPayloadSchema = z.object({
  title: z.string().min(2).max(160),
  amount: z.number().min(0),
  status: z.enum(["NEW", "CONTACTED", "PROPOSAL", "WON", "LOST"]).optional(),
  clientId: z.string().min(1),
  managerId: z.string().min(1),
  notes: z.string().max(2000).optional(),
});

export const dealUpdateSchema = dealPayloadSchema.partial();

export const dealStatusSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "PROPOSAL", "WON", "LOST"]),
});

export const dealCommentSchema = z.object({
  comment: z.string().min(2).max(1000),
});
