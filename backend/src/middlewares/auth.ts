import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/http";
import { verifyJwt } from "../utils/jwt";

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Missing or invalid authorization header"));
  }

  const token = authHeader.slice("Bearer ".length);

  try {
    const payload = verifyJwt(token);
    req.user = {
      id: payload.sub,
      role: payload.role,
      email: payload.email,
    };
    return next();
  } catch {
    return next(new ApiError(401, "Invalid or expired token"));
  }
}
