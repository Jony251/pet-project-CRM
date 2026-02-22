import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../../utils/http";
import { requiredParam } from "../../utils/request";
import * as svc from "./notifications.service";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new ApiError(401, "Auth required");
    res.json(await svc.listNotifications(req.user.id));
  } catch (e) { next(e); }
}

export async function markRead(req: Request, res: Response, next: NextFunction) {
  try { res.json(await svc.markRead(requiredParam(req.params.id, "id"))); } catch (e) { next(e); }
}

export async function markAllRead(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new ApiError(401, "Auth required");
    await svc.markAllRead(req.user.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
}

export async function count(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new ApiError(401, "Auth required");
    res.json({ count: await svc.unreadCount(req.user.id) });
  } catch (e) { next(e); }
}
