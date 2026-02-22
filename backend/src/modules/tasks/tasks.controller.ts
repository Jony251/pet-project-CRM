import type { NextFunction, Request, Response } from "express";
import { getPagination } from "../../utils/http";
import { requiredParam, optionalString } from "../../utils/request";
import * as svc from "./tasks.service";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = getPagination(req);
    res.json(await svc.listTasks({ page, limit, status: optionalString(req.query.status) as never, search: optionalString(req.query.search) }));
  } catch (e) { next(e); }
}

export async function all(_req: Request, res: Response, next: NextFunction) {
  try { res.json(await svc.getAllTasks()); } catch (e) { next(e); }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try { res.status(201).json(await svc.createTask({ ...req.body, createdById: req.user?.id })); } catch (e) { next(e); }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try { res.json(await svc.updateTask(requiredParam(req.params.id, "id"), req.body)); } catch (e) { next(e); }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try { await svc.deleteTask(requiredParam(req.params.id, "id")); res.status(204).end(); } catch (e) { next(e); }
}
