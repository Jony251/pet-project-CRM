import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../../utils/http";
import { getUserProfile, loginUser, registerUser } from "./auth.service";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const requestedRole = req.body.role as "ADMIN" | "MANAGER" | "VIEWER" | undefined;
    const actor = req.user;

    const role =
      requestedRole && requestedRole !== "VIEWER"
        ? actor?.role === "ADMIN"
          ? requestedRole
          : (() => {
              throw new ApiError(403, "Only admins can assign elevated roles");
            })()
        : requestedRole;

    const payload = await registerUser({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role,
    });
    res.status(201).json(payload);
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = await loginUser({
      email: req.body.email,
      password: req.body.password,
    });
    res.json(payload);
  } catch (error) {
    next(error);
  }
}

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }

    const profile = await getUserProfile(req.user.id);
    res.json(profile);
  } catch (error) {
    next(error);
  }
}
