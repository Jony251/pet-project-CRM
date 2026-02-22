import { prisma } from "../../utils/prisma";

interface ListInput { page: number; limit: number; search?: string; status?: string }

export async function listInvoices(input: ListInput) {
  const skip = (input.page - 1) * input.limit;
  const where = {
    ...(input.search ? { OR: [{ customer: { contains: input.search, mode: "insensitive" as const } }, { number: { contains: input.search, mode: "insensitive" as const } }] } : {}),
    ...(input.status && input.status !== "all" ? { status: input.status.toUpperCase() as never } : {}),
  };
  const [items, total] = await Promise.all([
    prisma.invoice.findMany({ where, orderBy: { date: "desc" }, skip, take: input.limit }),
    prisma.invoice.count({ where }),
  ]);
  return { data: items, total, page: input.page, pageSize: input.limit, totalPages: Math.ceil(total / input.limit) };
}
