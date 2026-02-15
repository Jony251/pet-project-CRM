import { TaskStatus } from "@prisma/client";
import { prisma } from "../../utils/prisma";
import { ApiError } from "../../utils/http";

type ListTasksInput = {
  page: number;
  limit: number;
  status?: TaskStatus;
  assignedUserId?: string;
  search?: string;
};

async function ensureUser(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
  if (!user) {
    throw new ApiError(400, "Assigned user not found");
  }
}

export async function listTasks(input: ListTasksInput) {
  const skip = (input.page - 1) * input.limit;
  const where = {
    ...(input.status ? { status: input.status } : {}),
    ...(input.assignedUserId ? { assignedUserId: input.assignedUserId } : {}),
    ...(input.search
      ? {
          OR: [
            { title: { contains: input.search, mode: "insensitive" as const } },
            { description: { contains: input.search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.task.findMany({
      where,
      orderBy: [{ status: "asc" }, { deadline: "asc" }, { createdAt: "desc" }],
      skip,
      take: input.limit,
      include: {
        assignedUser: { select: { id: true, name: true, email: true, role: true } },
        createdBy: { select: { id: true, name: true, email: true, role: true } },
      },
    }),
    prisma.task.count({ where }),
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

export async function getTaskById(id: string) {
  const task = await prisma.task.findUnique({
    where: { id },
    include: {
      assignedUser: { select: { id: true, name: true, email: true, role: true } },
      createdBy: { select: { id: true, name: true, email: true, role: true } },
    },
  });
  if (!task) {
    throw new ApiError(404, "Task not found");
  }
  return task;
}

export async function createTask(input: {
  title: string;
  description?: string;
  deadline?: string;
  status?: TaskStatus;
  assignedUserId: string;
  createdById: string;
}) {
  await ensureUser(input.assignedUserId);
  return prisma.task.create({
    data: {
      title: input.title,
      description: input.description,
      deadline: input.deadline ? new Date(input.deadline) : undefined,
      status: input.status ?? "TODO",
      assignedUserId: input.assignedUserId,
      createdById: input.createdById,
    },
    include: {
      assignedUser: { select: { id: true, name: true, email: true, role: true } },
      createdBy: { select: { id: true, name: true, email: true, role: true } },
    },
  });
}

export async function updateTask(
  id: string,
  input: {
    title?: string;
    description?: string;
    deadline?: string;
    status?: TaskStatus;
    assignedUserId?: string;
  }
) {
  const existing = await prisma.task.findUnique({ where: { id }, select: { id: true } });
  if (!existing) {
    throw new ApiError(404, "Task not found");
  }
  if (input.assignedUserId) {
    await ensureUser(input.assignedUserId);
  }

  return prisma.task.update({
    where: { id },
    data: {
      title: input.title,
      description: input.description,
      status: input.status,
      deadline: input.deadline ? new Date(input.deadline) : undefined,
      assignedUserId: input.assignedUserId,
    },
    include: {
      assignedUser: { select: { id: true, name: true, email: true, role: true } },
      createdBy: { select: { id: true, name: true, email: true, role: true } },
    },
  });
}

export async function updateTaskStatus(id: string, status: TaskStatus) {
  const existing = await prisma.task.findUnique({ where: { id }, select: { id: true } });
  if (!existing) {
    throw new ApiError(404, "Task not found");
  }

  return prisma.task.update({
    where: { id },
    data: { status },
    include: {
      assignedUser: { select: { id: true, name: true, email: true, role: true } },
      createdBy: { select: { id: true, name: true, email: true, role: true } },
    },
  });
}

export async function deleteTask(id: string) {
  const existing = await prisma.task.findUnique({ where: { id }, select: { id: true } });
  if (!existing) {
    throw new ApiError(404, "Task not found");
  }
  await prisma.task.delete({ where: { id } });
}
