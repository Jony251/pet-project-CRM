import type { NextFunction, Request, Response } from "express";
import { ApiError, getPagination } from "../../utils/http";
import { optionalString, requiredParam } from "../../utils/request";
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
    const status = optionalString(req.query.status);
    const payload = await listTasks({
      page,
      limit,
      status:
        status && ["TODO", "IN_PROGRESS", "DONE", "BLOCKED"].includes(status)
          ? (status as "TODO" | "IN_PROGRESS" | "DONE" | "BLOCKED")
          : undefined,
      assignedUserId: optionalString(req.query.assignedUserId),
      search: optionalString(req.query.search),
    });
    res.json(payload);
  } catch (error) {
    next(error);
  }
}

export async function getTask(req: Request, res: Response, next: NextFunction) {
  try {
    const task = await getTaskById(requiredParam(req.params.id, "id"));
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
    const task = await updateTask(requiredParam(req.params.id, "id"), req.body);
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
    const task = await updateTaskStatus(requiredParam(req.params.id, "id"), req.body.status);
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
    const taskId = requiredParam(req.params.id, "id");
    await deleteTask(taskId);
    await logActivity({
      userId: req.user.id,
      action: "delete-task",
      entityType: "Task",
      entityId: taskId,
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
