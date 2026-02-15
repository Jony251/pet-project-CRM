import { prisma } from "../../utils/prisma";
import { ApiError } from "../../utils/http";

type ListClientsInput = {
  page: number;
  limit: number;
  search?: string;
  source?: string;
  assignedManagerId?: string;
};

async function ensureManagerExists(managerId: string) {
  const manager = await prisma.user.findUnique({
    where: { id: managerId },
    select: { id: true, role: true },
  });

  if (!manager || (manager.role !== "MANAGER" && manager.role !== "ADMIN")) {
    throw new ApiError(400, "Assigned manager not found or has invalid role");
  }
}

export async function listClients(input: ListClientsInput) {
  const skip = (input.page - 1) * input.limit;
  const where = {
    ...(input.search
      ? {
          OR: [
            { name: { contains: input.search, mode: "insensitive" as const } },
            { email: { contains: input.search, mode: "insensitive" as const } },
            { company: { contains: input.search, mode: "insensitive" as const } },
          ],
        }
      : {}),
    ...(input.source ? { source: input.source } : {}),
    ...(input.assignedManagerId ? { assignedManagerId: input.assignedManagerId } : {}),
  };

  const [items, total] = await Promise.all([
    prisma.client.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: input.limit,
      include: {
        assignedManager: {
          select: { id: true, name: true, email: true, role: true },
        },
        _count: { select: { deals: true, interactions: true } },
      },
    }),
    prisma.client.count({ where }),
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

export async function getClientById(id: string) {
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      assignedManager: {
        select: { id: true, name: true, email: true, role: true },
      },
      deals: {
        orderBy: { updatedAt: "desc" },
      },
      interactions: {
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { id: true, name: true, email: true, role: true } },
        },
      },
    },
  });

  if (!client) {
    throw new ApiError(404, "Client not found");
  }

  return client;
}

export async function createClient(input: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source?: string;
  assignedManagerId?: string;
}) {
  if (input.assignedManagerId) {
    await ensureManagerExists(input.assignedManagerId);
  }

  return prisma.client.create({
    data: input,
    include: {
      assignedManager: {
        select: { id: true, name: true, email: true, role: true },
      },
    },
  });
}

export async function updateClient(
  id: string,
  input: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    source?: string;
    assignedManagerId?: string;
  }
) {
  const existing = await prisma.client.findUnique({ where: { id }, select: { id: true } });
  if (!existing) {
    throw new ApiError(404, "Client not found");
  }

  if (input.assignedManagerId) {
    await ensureManagerExists(input.assignedManagerId);
  }

  return prisma.client.update({
    where: { id },
    data: input,
    include: {
      assignedManager: {
        select: { id: true, name: true, email: true, role: true },
      },
    },
  });
}

export async function deleteClient(id: string) {
  const existing = await prisma.client.findUnique({ where: { id }, select: { id: true } });
  if (!existing) {
    throw new ApiError(404, "Client not found");
  }

  await prisma.client.delete({ where: { id } });
}

export async function addInteraction(input: {
  clientId: string;
  userId: string;
  type: string;
  note: string;
}) {
  const existing = await prisma.client.findUnique({
    where: { id: input.clientId },
    select: { id: true },
  });
  if (!existing) {
    throw new ApiError(404, "Client not found");
  }

  return prisma.interaction.create({
    data: {
      clientId: input.clientId,
      userId: input.userId,
      type: input.type,
      note: input.note,
    },
    include: {
      user: { select: { id: true, name: true, email: true, role: true } },
    },
  });
}
