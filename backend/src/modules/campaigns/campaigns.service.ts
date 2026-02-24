import { prisma } from "../../utils/prisma";

export async function listCampaigns() {
  return prisma.campaign.findMany({ orderBy: { startDate: "desc" } });
}
