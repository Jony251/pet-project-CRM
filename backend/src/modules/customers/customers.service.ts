import { prisma } from "../../utils/prisma";
import { ApiError } from "../../utils/http";

interface ListInput { page: number; limit: number; search?: string; status?: string }

export async function listCustomers(input: ListInput) {
  const skip = (input.page - 1) * input.limit;
  const where = {
    ...(input.search ? { OR: [{ name: { contains: input.search, mode: "insensitive" as const } }, { email: { contains: input.search, mode: "insensitive" as const } }] } : {}),
    ...(input.status && input.status !== "all" ? { status: input.status } : {}),
  };
  const [items, total] = await Promise.all([
    prisma.customer.findMany({ where, orderBy: { createdAt: "desc" }, skip, take: input.limit }),
    prisma.customer.count({ where }),
  ]);
  return { data: items, total, page: input.page, pageSize: input.limit, totalPages: Math.ceil(total / input.limit) };
}

export async function getCustomerById(id: string) {
  const c = await prisma.customer.findUnique({ where: { id } });
  if (!c) throw new ApiError(404, "Customer not found");
  return c;
}

export async function createCustomer(data: { name: string; email: string; location: string; status?: string }) {
  return prisma.customer.create({ data });
}

export async function updateCustomer(id: string, data: Record<string, unknown>) {
  const existing = await prisma.customer.findUnique({ where: { id }, select: { id: true } });
  if (!existing) throw new ApiError(404, "Customer not found");
  return prisma.customer.update({ where: { id }, data });
}

export async function deleteCustomer(id: string) {
  const existing = await prisma.customer.findUnique({ where: { id }, select: { id: true } });
  if (!existing) throw new ApiError(404, "Customer not found");
  await prisma.customer.delete({ where: { id } });
}
