import type { NextFunction, Request, Response } from "express";
import { getPagination } from "../../utils/http";
import { requiredParam, optionalString } from "../../utils/request";
import * as svc from "./customers.service";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = getPagination(req);
    const search = optionalString(req.query.search);
    const status = optionalString(req.query.status);
    res.json(await svc.listCustomers({ page, limit, search, status }));
  } catch (e) { next(e); }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try { res.json(await svc.getCustomerById(requiredParam(req.params.id, "id"))); } catch (e) { next(e); }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try { res.status(201).json(await svc.createCustomer(req.body)); } catch (e) { next(e); }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try { res.json(await svc.updateCustomer(requiredParam(req.params.id, "id"), req.body)); } catch (e) { next(e); }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try { await svc.deleteCustomer(requiredParam(req.params.id, "id")); res.status(204).end(); } catch (e) { next(e); }
}
