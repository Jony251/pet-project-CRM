import bcrypt from "bcryptjs";
import { prisma } from "../../utils/prisma";
import { ApiError } from "../../utils/http";
import type { Role } from "@prisma/client";

type ListUsersInput = {
  page: number;
  limit: number;
  search?: string;
  role?: Role;
};

export async function listUsers(input: ListUsersInput) {
  const skip = (input.page - 1) * input.limit;
  const where = {
    ...(input.search
      ? {
          OR: [
            { name: { contains: input.search, mode: "insensitive" as const } },
            { email: { contains: input.search, mode: "insensitive" as const } },
          ],
        }
      : {}),
    ...(input.role ? { role: input.role } : {}),
  };

  const [items, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: input.limit,
    }),
    prisma.user.count({ where }),
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

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  role: Role;
}) {
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
    select: { id: true },
  });

  if (existing) {
    throw new ApiError(409, "Email already in use");
  }

  const password = await bcrypt.hash(input.password, 12);

  return prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password,
      role: input.role,
    },
    select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
  });
}

export async function updateUserRole(userId: string, role: Role) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return prisma.user.update({
    where: { id: userId },
    data: { role },
    select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
  });
}
