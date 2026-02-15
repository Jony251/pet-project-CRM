import type { NextFunction, Request, Response } from "express";
import { listActivities } from "./activity.service";

export async function getActivities(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await listActivities(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
