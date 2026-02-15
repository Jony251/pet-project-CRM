import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/http";

type Role = "ADMIN" | "MANAGER" | "VIEWER";

export function authorize(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, "Authentication required"));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "Insufficient permissions"));
    }

    return next();
  };
}
