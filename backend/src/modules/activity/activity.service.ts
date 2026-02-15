import { prisma } from "../../utils/prisma";
import { getPagination } from "../../utils/http";
import type { Request } from "express";

export async function logActivity(input: {
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: unknown;
}) {
  return prisma.activityLog.create({
    data: {
      userId: input.userId,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      metadata: (input.metadata as object | undefined) ?? undefined,
    },
  });
}

export async function listActivities(req: Request) {
  const { page, limit, skip } = getPagination(req);
  const entityType = req.query.entityType as string | undefined;
  const entityId = req.query.entityId as string | undefined;
  const userId = req.query.userId as string | undefined;

  const where = {
    ...(entityType ? { entityType } : {}),
    ...(entityId ? { entityId } : {}),
    ...(userId ? { userId } : {}),
  };

  const [items, total] = await Promise.all([
    prisma.activityLog.findMany({
      where,
      orderBy: { timestamp: "desc" },
      skip,
      take: limit,
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
      },
    }),
    prisma.activityLog.count({ where }),
  ]);

  return {
    items,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
