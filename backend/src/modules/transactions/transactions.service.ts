import { prisma } from "../../utils/prisma";

interface ListInput { page: number; limit: number; search?: string }

export async function listTransactions(input: ListInput) {
  const skip = (input.page - 1) * input.limit;
  const where = input.search ? { description: { contains: input.search, mode: "insensitive" as const } } : {};
  const [items, total] = await Promise.all([
    prisma.transaction.findMany({ where, orderBy: { date: "desc" }, skip, take: input.limit }),
    prisma.transaction.count({ where }),
  ]);
  return { data: items, total, page: input.page, pageSize: input.limit, totalPages: Math.ceil(total / input.limit) };
}
