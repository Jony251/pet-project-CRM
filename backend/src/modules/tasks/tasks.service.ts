import type { TaskStatus, TaskPriority } from "@prisma/client";
import { prisma } from "../../utils/prisma";
import { ApiError } from "../../utils/http";

interface ListInput { page: number; limit: number; status?: TaskStatus; search?: string }

export async function listTasks(input: ListInput) {
  const skip = (input.page - 1) * input.limit;
  const where = {
    ...(input.status ? { status: input.status } : {}),
    ...(input.search ? { OR: [{ title: { contains: input.search, mode: "insensitive" as const } }] } : {}),
  };
  const [items, total] = await Promise.all([
    prisma.task.findMany({
      where,
      orderBy: [{ status: "asc" }, { createdAt: "desc" }],
      skip,
      take: input.limit,
      include: { assignedUser: { select: { id: true, name: true, email: true } }, createdBy: { select: { id: true, name: true } } },
    }),
    prisma.task.count({ where }),
  ]);
  return { data: items, total, page: input.page, pageSize: input.limit, totalPages: Math.ceil(total / input.limit) };
}

export async function getAllTasks() {
  return prisma.task.findMany({
    orderBy: [{ status: "asc" }, { priority: "asc" }, { createdAt: "desc" }],
    include: { assignedUser: { select: { id: true, name: true } } },
  });
}

export async function createTask(data: { title: string; description?: string; status?: TaskStatus; priority?: TaskPriority; dueDate?: string; tags?: string[]; assignedUserId?: string; createdById?: string }) {
  return prisma.task.create({
    data: { ...data, dueDate: data.dueDate ? new Date(data.dueDate) : undefined },
    include: { assignedUser: { select: { id: true, name: true } } },
  });
}

export async function updateTask(id: string, data: Record<string, unknown>) {
  const existing = await prisma.task.findUnique({ where: { id }, select: { id: true } });
  if (!existing) throw new ApiError(404, "Task not found");
  if (typeof data.dueDate === "string") data.dueDate = new Date(data.dueDate);
  return prisma.task.update({ where: { id }, data, include: { assignedUser: { select: { id: true, name: true } } } });
}

export async function deleteTask(id: string) {
  const existing = await prisma.task.findUnique({ where: { id }, select: { id: true } });
  if (!existing) throw new ApiError(404, "Task not found");
  await prisma.task.delete({ where: { id } });
}
