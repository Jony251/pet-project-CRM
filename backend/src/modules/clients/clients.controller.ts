import type { NextFunction, Request, Response } from "express";
import { ApiError, getPagination } from "../../utils/http";
import { optionalString, requiredParam } from "../../utils/request";
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
      search: optionalString(req.query.search),
      source: optionalString(req.query.source),
      assignedManagerId: optionalString(req.query.assignedManagerId),
    });
    res.json(payload);
  } catch (error) {
    next(error);
  }
}

export async function getClient(req: Request, res: Response, next: NextFunction) {
  try {
    const client = await getClientById(requiredParam(req.params.id, "id"));
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
    const client = await updateClient(requiredParam(req.params.id, "id"), req.body);
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
    const clientId = requiredParam(req.params.id, "id");
    await deleteClient(clientId);
    await logActivity({
      userId: req.user.id,
      action: "delete-client",
      entityType: "Client",
      entityId: clientId,
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
    const clientId = requiredParam(req.params.id, "id");
    const interaction = await addInteraction({
      clientId,
      userId: req.user.id,
      type: req.body.type,
      note: req.body.note,
    });

    await logActivity({
      userId: req.user.id,
      action: "add-client-interaction",
      entityType: "Client",
      entityId: clientId,
      metadata: { interactionId: interaction.id },
    });

    res.status(201).json(interaction);
  } catch (error) {
    next(error);
  }
}
