import type { NextFunction, Request, Response } from "express";
import { ApiError, getPagination } from "../../utils/http";
import { logActivity } from "../activity/activity.service";
import {
  addDealComment,
  createDeal,
  deleteDeal,
  getDealById,
  getPipelineBoard,
  listDeals,
  updateDeal,
  updateDealStatus,
} from "./deals.service";

export async function getDeals(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = getPagination(req);
    const payload = await listDeals({
      page,
      limit,
      search: req.query.search as string | undefined,
      status: req.query.status as "NEW" | "CONTACTED" | "PROPOSAL" | "WON" | "LOST" | undefined,
      managerId: req.query.managerId as string | undefined,
      clientId: req.query.clientId as string | undefined,
    });
    res.json(payload);
  } catch (error) {
    next(error);
  }
}

export async function getDeal(req: Request, res: Response, next: NextFunction) {
  try {
    const deal = await getDealById(req.params.id);
    res.json(deal);
  } catch (error) {
    next(error);
  }
}

export async function postDeal(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }
    const deal = await createDeal(req.body);
    await logActivity({
      userId: req.user.id,
      action: "create-deal",
      entityType: "Deal",
      entityId: deal.id,
    });
    res.status(201).json(deal);
  } catch (error) {
    next(error);
  }
}

export async function patchDeal(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }
    const deal = await updateDeal(req.params.id, req.body);
    await logActivity({
      userId: req.user.id,
      action: "update-deal",
      entityType: "Deal",
      entityId: deal.id,
    });
    res.json(deal);
  } catch (error) {
    next(error);
  }
}

export async function patchDealStatus(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }
    const deal = await updateDealStatus(req.params.id, req.body.status);
    await logActivity({
      userId: req.user.id,
      action: "move-deal-stage",
      entityType: "Deal",
      entityId: deal.id,
      metadata: { status: deal.status },
    });
    res.json(deal);
  } catch (error) {
    next(error);
  }
}

export async function removeDeal(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }
    await deleteDeal(req.params.id);
    await logActivity({
      userId: req.user.id,
      action: "delete-deal",
      entityType: "Deal",
      entityId: req.params.id,
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function postDealComment(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }
    const comment = await addDealComment({
      dealId: req.params.id,
      userId: req.user.id,
      comment: req.body.comment,
    });
    await logActivity({
      userId: req.user.id,
      action: "comment-deal",
      entityType: "Deal",
      entityId: req.params.id,
      metadata: { commentId: comment.id },
    });
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
}

export async function getPipeline(req: Request, res: Response, next: NextFunction) {
  try {
    const managerId = req.query.managerId as string | undefined;
    const board = await getPipelineBoard(managerId);
    res.json(board);
  } catch (error) {
    next(error);
  }
}
