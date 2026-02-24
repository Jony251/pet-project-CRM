import { prisma } from "../../utils/prisma";

export async function listProducts(search?: string) {
  const where = search ? { OR: [{ name: { contains: search, mode: "insensitive" as const } }, { category: { contains: search, mode: "insensitive" as const } }] } : {};
  return prisma.product.findMany({ where, orderBy: { createdAt: "desc" } });
}
