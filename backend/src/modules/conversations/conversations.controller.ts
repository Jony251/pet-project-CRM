import type { NextFunction, Request, Response } from "express";
import { requiredParam } from "../../utils/request";
import * as svc from "./conversations.service";

export async function list(_req: Request, res: Response, next: NextFunction) {
  try { res.json(await svc.listConversations()); } catch (e) { next(e); }
}

export async function messages(req: Request, res: Response, next: NextFunction) {
  try { res.json(await svc.getMessages(requiredParam(req.params.id, "id"))); } catch (e) { next(e); }
}

export async function send(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id ?? null;
    const name = req.body.senderName ?? "You";
    res.status(201).json(await svc.sendMessage(requiredParam(req.params.id, "id"), userId, name, req.body.content));
  } catch (e) { next(e); }
}
