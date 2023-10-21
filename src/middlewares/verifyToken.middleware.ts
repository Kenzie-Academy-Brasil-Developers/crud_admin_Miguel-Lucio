import AppError from "../errors/AppError.error";
import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError("Missing bearer token", 401);
  }

  const token: string = authorization.split(" ")[1];

  try {
    const decoded = verify(token, process.env.SECRET_KEY!);
    res.locals = { ...res.locals, decoded };

    return next();
  } catch (error) {
    throw new AppError("Missing bearer token", 401);
  }
};
