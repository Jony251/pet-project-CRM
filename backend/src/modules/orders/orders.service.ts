import { prisma } from "../../utils/prisma";

interface ListInput { page: number; limit: number; search?: string; status?: string; sortBy?: string; sortDir?: string }

export async function listOrders(input: ListInput) {
  const skip = (input.page - 1) * input.limit;
  const where = {
    ...(input.search ? { OR: [{ customer: { contains: input.search, mode: "insensitive" as const } }, { id: { contains: input.search, mode: "insensitive" as const } }] } : {}),
    ...(input.status && input.status !== "all" ? { status: input.status.toUpperCase() as never } : {}),
  };
  const orderBy = input.sortBy ? { [input.sortBy]: input.sortDir === "desc" ? "desc" as const : "asc" as const } : { date: "desc" as const };
  const [items, total] = await Promise.all([
    prisma.order.findMany({ where, orderBy, skip, take: input.limit }),
    prisma.order.count({ where }),
  ]);
  return { data: items, total, page: input.page, pageSize: input.limit, totalPages: Math.ceil(total / input.limit) };
}

export async function createOrder(data: { customer: string; total: number; items: number; paymentMethod: string; status?: string }) {
  return prisma.order.create({ data: { ...data, status: (data.status?.toUpperCase() as never) ?? "PENDING" } });
}
