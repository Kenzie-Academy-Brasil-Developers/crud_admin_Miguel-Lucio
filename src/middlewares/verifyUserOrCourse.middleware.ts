import { NextFunction, Request, Response } from "express";
import { TUserResult } from "../interfaces/users.interface";
import { client } from "../database";
import format from "pg-format";
import { TCourseResult } from "../interfaces/courses.interface";
import AppError from "../errors/AppError.error";

export const verifyUserOrCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const queryUserFormat: string = format(
    'SELECT * FROM "users" WHERE "id" =(%L);',
    req.params.userId
  );
  const queryCourseFormat: string = format(
    'SELECT * FROM "courses" WHERE "id" =(%L);',
    req.params.courseId
  );

  const queryUserResult: TUserResult = await client.query(queryUserFormat);
  const queryCourseResult: TCourseResult = await client.query(
    queryCourseFormat
  );

  if (!queryUserResult.rowCount || !queryCourseResult.rowCount) {
    throw new AppError("User/course not found", 404);
  }

  return next();
};
