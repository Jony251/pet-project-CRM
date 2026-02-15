import type { NextFunction, Request, Response } from "express";
import { getDashboardMetrics, getRevenueReport } from "./analytics.service";
import { ApiError } from "../../utils/http";

export async function getDashboard(req: Request, res: Response, next: NextFunction) {
  try {
    const metrics = await getDashboardMetrics();
    res.json(metrics);
  } catch (error) {
    next(error);
  }
}

export async function getRevenue(req: Request, res: Response, next: NextFunction) {
  try {
    const period = (req.query.period as "monthly" | "quarterly" | "yearly" | undefined) ?? "monthly";
    if (!["monthly", "quarterly", "yearly"].includes(period)) {
      throw new ApiError(400, "Invalid period. Use monthly, quarterly or yearly.");
    }
    const report = await getRevenueReport(period);
    res.json(report);
  } catch (error) {
    next(error);
  }
}
