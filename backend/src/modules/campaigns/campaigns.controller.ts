import type { NextFunction, Request, Response } from "express";
import * as svc from "./campaigns.service";
export async function list(_req: Request, res: Response, next: NextFunction) {
  try { res.json(await svc.listCampaigns()); } catch (e) { next(e); }
}
