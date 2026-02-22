import type { NextFunction, Request, Response } from "express";
import { requiredParam } from "../../utils/request";
import * as svc from "./community.service";

export async function users(_req: Request, res: Response, next: NextFunction) {
  try { res.json(await svc.listCommunityUsers()); } catch (e) { next(e); }
}
export async function feed(_req: Request, res: Response, next: NextFunction) {
  try { res.json(await svc.listFeedPosts()); } catch (e) { next(e); }
}
export async function likeFeed(req: Request, res: Response, next: NextFunction) {
  try { res.json(await svc.likeFeedPost(requiredParam(req.params.id, "id"))); } catch (e) { next(e); }
}
export async function forum(_req: Request, res: Response, next: NextFunction) {
  try { res.json(await svc.listForumPosts()); } catch (e) { next(e); }
}
export async function meetups(_req: Request, res: Response, next: NextFunction) {
  try { res.json(await svc.listMeetups()); } catch (e) { next(e); }
}
