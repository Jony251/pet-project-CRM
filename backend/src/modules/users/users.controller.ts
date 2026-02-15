import type { NextFunction, Request, Response } from "express";
import { ApiError, getPagination } from "../../utils/http";
import { optionalString, requiredParam } from "../../utils/request";
import { createUser, listUsers, updateUserRole } from "./users.service";
import { logActivity } from "../activity/activity.service";

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = getPagination(req);
    const search = optionalString(req.query.search);
    const roleQuery = optionalString(req.query.role);
    const role =
      roleQuery && ["ADMIN", "MANAGER", "VIEWER"].includes(roleQuery)
        ? (roleQuery as "ADMIN" | "MANAGER" | "VIEWER")
        : undefined;
    const payload = await listUsers({ page, limit, search, role });
    res.json(payload);
  } catch (error) {
    next(error);
  }
}

export async function postUser(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }

    const user = await createUser(req.body);
    await logActivity({
      userId: req.user.id,
      action: "create-user",
      entityType: "User",
      entityId: user.id,
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function patchUserRole(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }

    const user = await updateUserRole(requiredParam(req.params.id, "id"), req.body.role);
    await logActivity({
      userId: req.user.id,
      action: "update-user-role",
      entityType: "User",
      entityId: user.id,
      metadata: { role: user.role },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
}
