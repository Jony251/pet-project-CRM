import type { NextFunction, Request, Response } from "express";
import { ApiError, getPagination } from "../../utils/http";
import { logActivity } from "../activity/activity.service";
import {
  createTask,
  deleteTask,
  getTaskById,
  listTasks,
  updateTask,
  updateTaskStatus,
} from "./tasks.service";

export async function getTasks(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = getPagination(req);
    const payload = await listTasks({
      page,
      limit,
      status: req.query.status as "TODO" | "IN_PROGRESS" | "DONE" | "BLOCKED" | undefined,
      assignedUserId: req.query.assignedUserId as string | undefined,
      search: req.query.search as string | undefined,
    });
    res.json(payload);
  } catch (error) {
    next(error);
  }
}

export async function getTask(req: Request, res: Response, next: NextFunction) {
  try {
    const task = await getTaskById(req.params.id);
    res.json(task);
  } catch (error) {
    next(error);
  }
}

export async function postTask(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }
    const task = await createTask({
      ...req.body,
      createdById: req.user.id,
    });
    await logActivity({
      userId: req.user.id,
      action: "create-task",
      entityType: "Task",
      entityId: task.id,
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

export async function patchTask(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }
    const task = await updateTask(req.params.id, req.body);
    await logActivity({
      userId: req.user.id,
      action: "update-task",
      entityType: "Task",
      entityId: task.id,
    });
    res.json(task);
  } catch (error) {
    next(error);
  }
}

export async function patchTaskStatus(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }
    const task = await updateTaskStatus(req.params.id, req.body.status);
    await logActivity({
      userId: req.user.id,
      action: "update-task-status",
      entityType: "Task",
      entityId: task.id,
      metadata: { status: task.status },
    });
    res.json(task);
  } catch (error) {
    next(error);
  }
}

export async function removeTask(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }
    await deleteTask(req.params.id);
    await logActivity({
      userId: req.user.id,
      action: "delete-task",
      entityType: "Task",
      entityId: req.params.id,
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
