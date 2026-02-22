import { prisma } from "../../utils/prisma";

export async function listJobs(search?: string) {
  const where = search ? { OR: [{ title: { contains: search, mode: "insensitive" as const } }, { company: { contains: search, mode: "insensitive" as const } }] } : {};
  return prisma.job.findMany({ where, orderBy: [{ featured: "desc" }, { posted: "desc" }] });
}
