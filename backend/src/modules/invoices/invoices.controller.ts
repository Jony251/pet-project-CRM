import type { NextFunction, Request, Response } from "express";
import { getPagination } from "../../utils/http";
import { optionalString } from "../../utils/request";
import * as svc from "./invoices.service";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = getPagination(req);
    res.json(await svc.listInvoices({ page, limit, search: optionalString(req.query.search), status: optionalString(req.query.status) }));
  } catch (e) { next(e); }
}
