import bcrypt from "bcryptjs";
import { prisma } from "../../utils/prisma";
import { ApiError } from "../../utils/http";
import { signJwt } from "../../utils/jwt";
import type { Role } from "@prisma/client";

function formatUser(user: { id: string; name: string; email: string; role: Role }) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
  role?: Role;
}) {
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
    select: { id: true },
  });

  if (existing) {
    throw new ApiError(409, "Email already in use");
  }

  const hashedPassword = await bcrypt.hash(input.password, 12);

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password: hashedPassword,
      role: input.role ?? "VIEWER",
    },
  });

  const token = signJwt({
    sub: user.id,
    role: user.role,
    email: user.email,
  });

  return {
    user: formatUser(user),
    token,
  };
}

export async function loginUser(input: { email: string; password: string }) {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = signJwt({
    sub: user.id,
    role: user.role,
    email: user.email,
  });

  return {
    user: formatUser(user),
    token,
  };
}

export async function getUserProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
}
