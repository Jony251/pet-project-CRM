import type { NextFunction, Request, Response } from "express";
import * as svc from "./calendar.service";
export async function list(_req: Request, res: Response, next: NextFunction) {
  try { res.json(await svc.listEvents()); } catch (e) { next(e); }
}
export async function create(req: Request, res: Response, next: NextFunction) {
  try { res.status(201).json(await svc.createEvent(req.body)); } catch (e) { next(e); }
}
