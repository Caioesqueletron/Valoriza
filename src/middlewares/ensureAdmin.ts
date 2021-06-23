import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const admin = false;

  if (admin) {
    return next();
  }

  throw new AppError("Unauthorized", 401);
}
