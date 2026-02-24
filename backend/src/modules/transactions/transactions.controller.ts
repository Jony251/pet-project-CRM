import type { NextFunction, Request, Response } from "express";
import { getPagination } from "../../utils/http";
import { optionalString } from "../../utils/request";
import * as svc from "./transactions.service";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = getPagination(req);
    res.json(await svc.listTransactions({ page, limit, search: optionalString(req.query.search) }));
  } catch (e) { next(e); }
}
