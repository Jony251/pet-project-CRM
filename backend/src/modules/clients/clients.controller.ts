import type { NextFunction, Request, Response } from "express";
import { ApiError, getPagination } from "../../utils/http";
import { logActivity } from "../activity/activity.service";
import {
  addInteraction,
  createClient,
  deleteClient,
  getClientById,
  listClients,
  updateClient,
} from "./clients.service";

export async function getClients(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = getPagination(req);
    const payload = await listClients({
      page,
      limit,
      search: req.query.search as string | undefined,
      source: req.query.source as string | undefined,
      assignedManagerId: req.query.assignedManagerId as string | undefined,
    });
    res.json(payload);
  } catch (error) {
    next(error);
  }
}

export async function getClient(req: Request, res: Response, next: NextFunction) {
  try {
    const client = await getClientById(req.params.id);
    res.json(client);
  } catch (error) {
    next(error);
  }
}

export async function postClient(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }
    const client = await createClient(req.body);
    await logActivity({
      userId: req.user.id,
      action: "create-client",
      entityType: "Client",
      entityId: client.id,
    });
    res.status(201).json(client);
  } catch (error) {
    next(error);
  }
}

export async function patchClient(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }
    const client = await updateClient(req.params.id, req.body);
    await logActivity({
      userId: req.user.id,
      action: "update-client",
      entityType: "Client",
      entityId: client.id,
    });
    res.json(client);
  } catch (error) {
    next(error);
  }
}

export async function removeClient(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }
    await deleteClient(req.params.id);
    await logActivity({
      userId: req.user.id,
      action: "delete-client",
      entityType: "Client",
      entityId: req.params.id,
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function postInteraction(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }
    const interaction = await addInteraction({
      clientId: req.params.id,
      userId: req.user.id,
      type: req.body.type,
      note: req.body.note,
    });

    await logActivity({
      userId: req.user.id,
      action: "add-client-interaction",
      entityType: "Client",
      entityId: req.params.id,
      metadata: { interactionId: interaction.id },
    });

    res.status(201).json(interaction);
  } catch (error) {
    next(error);
  }
}
