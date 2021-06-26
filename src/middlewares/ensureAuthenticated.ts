import { Request, Response, NextFunction, request } from "express";
import { AppError } from "../errors/AppError";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new AppError("Token missing !", 401);
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(
      token,
      "dbd75cd12ca967cb1c8ce83909fcea89"
    ) as IPayload;

    request.user_id = sub;

    return next();
  } catch (err) {
    throw new AppError("Token missing !", 401);
  }
}
