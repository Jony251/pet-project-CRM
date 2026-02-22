import type { NextFunction, Request, Response } from "express";
import { optionalString } from "../../utils/request";
import * as svc from "./products.service";

export async function list(req: Request, res: Response, next: NextFunction) {
  try { res.json(await svc.listProducts(optionalString(req.query.search))); } catch (e) { next(e); }
}
