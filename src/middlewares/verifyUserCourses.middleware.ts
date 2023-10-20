import { NextFunction, Request, Response } from "express";
import format from "pg-format";
import { client } from "../database";
import AppError from "../errors/AppError.error";

export const verifyUserCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queryFormat: string = format(
    'SELECT * FROM "userCourses" WHERE "userId" = (%L);',
    req.params.id
  );

  const queryResult = await client.query(queryFormat);

  if (!queryResult.rowCount) {
    throw new AppError("No course found", 404);
  }
  return next();
};
