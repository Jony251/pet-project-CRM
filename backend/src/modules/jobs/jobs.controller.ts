import type { NextFunction, Request, Response } from "express";
import { optionalString } from "../../utils/request";
import * as svc from "./jobs.service";
export async function list(req: Request, res: Response, next: NextFunction) {
  try { res.json(await svc.listJobs(optionalString(req.query.search))); } catch (e) { next(e); }
}
