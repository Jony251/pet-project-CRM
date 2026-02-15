import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { logger } from "../config/logger";
import { ApiError } from "../utils/http";

export function notFound(_req: Request, _res: Response, next: NextFunction) {
  next(new ApiError(404, "Route not found"));
}

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      message: error.message,
      details: error.details,
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      details: error.flatten(),
    });
  }

  logger.error("Unhandled server error", {
    path: req.path,
    method: req.method,
    error,
  });

  return res.status(500).json({
    message: "Internal server error",
  });
}
