import type { NextFunction, Request, Response } from "express";
import { getPagination } from "../../utils/http";
import { optionalString } from "../../utils/request";
import * as svc from "./orders.service";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = getPagination(req);
    res.json(await svc.listOrders({ page, limit, search: optionalString(req.query.search), status: optionalString(req.query.status), sortBy: optionalString(req.query.sortBy), sortDir: optionalString(req.query.sortDir) }));
  } catch (e) { next(e); }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try { res.status(201).json(await svc.createOrder(req.body)); } catch (e) { next(e); }
}
