import { DealStatus } from "@prisma/client";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import { prisma } from "../../utils/prisma";

dayjs.extend(quarterOfYear);

export async function getDashboardMetrics() {
  const [totalLeads, totalDeals, wonDeals, lostDeals, pipelineGroups, managerGroups] = await Promise.all([
    prisma.client.count(),
    prisma.deal.count(),
    prisma.deal.count({ where: { status: DealStatus.WON } }),
    prisma.deal.count({ where: { status: DealStatus.LOST } }),
    prisma.deal.groupBy({
      by: ["status"],
      _count: { _all: true },
      _sum: { amount: true },
    }),
    prisma.deal.groupBy({
      by: ["managerId"],
      _count: { _all: true },
      _sum: { amount: true },
    }),
  ]);

  const managerIds = managerGroups.map((item) => item.managerId);
  const managers = await prisma.user.findMany({
    where: { id: { in: managerIds } },
    select: { id: true, name: true, email: true },
  });
  const managerMap = new Map(managers.map((manager) => [manager.id, manager]));

  const closedDeals = wonDeals + lostDeals;
  const conversionRate = closedDeals > 0 ? (wonDeals / closedDeals) * 100 : 0;
  const revenueWon = await prisma.deal.aggregate({
    where: { status: DealStatus.WON },
    _sum: { amount: true },
  });

  return {
    totals: {
      totalLeads,
      totalDeals,
      wonDeals,
      lostDeals,
      conversionRate: Number(conversionRate.toFixed(2)),
      revenueWon: revenueWon._sum.amount ?? 0,
    },
    pipeline: pipelineGroups.map((item) => ({
      status: item.status,
      dealsCount: item._count._all,
      amount: item._sum.amount ?? 0,
    })),
    dealsPerManager: managerGroups.map((item) => ({
      managerId: item.managerId,
      managerName: managerMap.get(item.managerId)?.name ?? "Unknown",
      managerEmail: managerMap.get(item.managerId)?.email ?? "",
      dealsCount: item._count._all,
      amount: item._sum.amount ?? 0,
    })),
  };
}

function buildBuckets(period: "monthly" | "quarterly" | "yearly") {
  const now = dayjs();
  if (period === "monthly") {
    return Array.from({ length: 12 }, (_, index) => now.subtract(11 - index, "month").startOf("month"));
  }
  if (period === "quarterly") {
    return Array.from({ length: 8 }, (_, index) => now.subtract(7 - index, "quarter").startOf("quarter"));
  }
  return Array.from({ length: 5 }, (_, index) => now.subtract(4 - index, "year").startOf("year"));
}

function labelFor(period: "monthly" | "quarterly" | "yearly", date: dayjs.Dayjs) {
  if (period === "monthly") {
    return date.format("YYYY-MM");
  }
  if (period === "quarterly") {
    return `${date.format("YYYY")}-Q${date.quarter()}`;
  }
  return date.format("YYYY");
}

export async function getRevenueReport(period: "monthly" | "quarterly" | "yearly") {
  const buckets = buildBuckets(period);
  const from = buckets[0].toDate();

  const wonDeals = await prisma.deal.findMany({
    where: {
      status: DealStatus.WON,
      createdAt: { gte: from },
    },
    select: { amount: true, createdAt: true },
  });

  const initialMap = new Map<string, number>();
  buckets.forEach((date) => initialMap.set(labelFor(period, date), 0));

  for (const deal of wonDeals) {
    const date = dayjs(deal.createdAt);
    const bucketLabel =
      period === "monthly"
        ? date.startOf("month")
        : period === "quarterly"
          ? date.startOf("quarter")
          : date.startOf("year");
    const key = labelFor(period, bucketLabel);
    if (initialMap.has(key)) {
      initialMap.set(key, (initialMap.get(key) ?? 0) + deal.amount);
    }
  }

  return Array.from(initialMap.entries()).map(([label, value]) => ({
    label,
    revenue: Number(value.toFixed(2)),
  }));
}
