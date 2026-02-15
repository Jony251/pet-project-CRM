import { DealStatus } from "@prisma/client";
import { prisma } from "../../utils/prisma";
import { ApiError } from "../../utils/http";

type ListDealsInput = {
  page: number;
  limit: number;
  search?: string;
  status?: DealStatus;
  managerId?: string;
  clientId?: string;
};

async function ensureClient(clientId: string) {
  const client = await prisma.client.findUnique({ where: { id: clientId }, select: { id: true } });
  if (!client) {
    throw new ApiError(400, "Client does not exist");
  }
}

async function ensureManager(managerId: string) {
  const manager = await prisma.user.findUnique({
    where: { id: managerId },
    select: { id: true, role: true },
  });
  if (!manager || (manager.role !== "MANAGER" && manager.role !== "ADMIN")) {
    throw new ApiError(400, "Manager does not exist or has invalid role");
  }
}

export async function listDeals(input: ListDealsInput) {
  const skip = (input.page - 1) * input.limit;
  const where = {
    ...(input.search
      ? {
          OR: [
            { title: { contains: input.search, mode: "insensitive" as const } },
            { client: { name: { contains: input.search, mode: "insensitive" as const } } },
          ],
        }
      : {}),
    ...(input.status ? { status: input.status } : {}),
    ...(input.managerId ? { managerId: input.managerId } : {}),
    ...(input.clientId ? { clientId: input.clientId } : {}),
  };

  const [items, total] = await Promise.all([
    prisma.deal.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip,
      take: input.limit,
      include: {
        client: { select: { id: true, name: true, email: true, company: true } },
        manager: { select: { id: true, name: true, email: true, role: true } },
        _count: { select: { comments: true } },
      },
    }),
    prisma.deal.count({ where }),
  ]);

  return {
    items,
    meta: {
      page: input.page,
      limit: input.limit,
      total,
      totalPages: Math.ceil(total / input.limit),
    },
  };
}

export async function getDealById(id: string) {
  const deal = await prisma.deal.findUnique({
    where: { id },
    include: {
      client: { select: { id: true, name: true, email: true, company: true } },
      manager: { select: { id: true, name: true, email: true, role: true } },
      comments: {
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { id: true, name: true, email: true, role: true } },
        },
      },
    },
  });
  if (!deal) {
    throw new ApiError(404, "Deal not found");
  }
  return deal;
}

export async function createDeal(input: {
  title: string;
  amount: number;
  status?: DealStatus;
  clientId: string;
  managerId: string;
  notes?: string;
}) {
  await Promise.all([ensureClient(input.clientId), ensureManager(input.managerId)]);
  return prisma.deal.create({
    data: {
      title: input.title,
      amount: input.amount,
      status: input.status ?? "NEW",
      clientId: input.clientId,
      managerId: input.managerId,
      notes: input.notes,
    },
    include: {
      client: { select: { id: true, name: true, email: true, company: true } },
      manager: { select: { id: true, name: true, email: true, role: true } },
    },
  });
}

export async function updateDeal(
  id: string,
  input: {
    title?: string;
    amount?: number;
    status?: DealStatus;
    clientId?: string;
    managerId?: string;
    notes?: string;
  }
) {
  const existing = await prisma.deal.findUnique({ where: { id }, select: { id: true } });
  if (!existing) {
    throw new ApiError(404, "Deal not found");
  }

  if (input.clientId) {
    await ensureClient(input.clientId);
  }
  if (input.managerId) {
    await ensureManager(input.managerId);
  }

  return prisma.deal.update({
    where: { id },
    data: input,
    include: {
      client: { select: { id: true, name: true, email: true, company: true } },
      manager: { select: { id: true, name: true, email: true, role: true } },
    },
  });
}

export async function updateDealStatus(id: string, status: DealStatus) {
  const existing = await prisma.deal.findUnique({ where: { id }, select: { id: true } });
  if (!existing) {
    throw new ApiError(404, "Deal not found");
  }

  return prisma.deal.update({
    where: { id },
    data: { status },
    include: {
      client: { select: { id: true, name: true } },
      manager: { select: { id: true, name: true } },
    },
  });
}

export async function deleteDeal(id: string) {
  const existing = await prisma.deal.findUnique({ where: { id }, select: { id: true } });
  if (!existing) {
    throw new ApiError(404, "Deal not found");
  }

  await prisma.deal.delete({ where: { id } });
}

export async function addDealComment(input: { dealId: string; userId: string; comment: string }) {
  const deal = await prisma.deal.findUnique({ where: { id: input.dealId }, select: { id: true } });
  if (!deal) {
    throw new ApiError(404, "Deal not found");
  }

  return prisma.dealComment.create({
    data: {
      dealId: input.dealId,
      userId: input.userId,
      comment: input.comment,
    },
    include: {
      user: { select: { id: true, name: true, email: true, role: true } },
    },
  });
}

export async function getPipelineBoard(managerId?: string) {
  const where = managerId ? { managerId } : {};
  const statuses: DealStatus[] = ["NEW", "CONTACTED", "PROPOSAL", "WON", "LOST"];

  const board = await Promise.all(
    statuses.map(async (status) => {
      const deals = await prisma.deal.findMany({
        where: { ...where, status },
        orderBy: { updatedAt: "desc" },
        include: {
          client: { select: { id: true, name: true, company: true } },
          manager: { select: { id: true, name: true } },
        },
      });

      return {
        status,
        totalAmount: deals.reduce((sum, item) => sum + item.amount, 0),
        deals,
      };
    })
  );

  return board;
}
