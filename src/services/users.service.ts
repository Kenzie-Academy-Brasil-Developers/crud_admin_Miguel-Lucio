import format from "pg-format";
import { TUserCreate } from "../__tests__/mocks/interfaces";
import {
  TUserCoursesResult,
  TUserRead,
  TUserResult,
  TUserReturn,
} from "../interfaces/users.interface";
import { hash } from "bcryptjs";
import { client } from "../database";
import { userReadSchema, userReturnSchema } from "../schemas/users.schema";

export const createUserService = async (
  data: TUserCreate
): Promise<TUserReturn> => {
  data.password = await hash(data.password, 10);

  const queryFormat: string = format(
    'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: TUserResult = await client.query(queryFormat);

  return userReturnSchema.parse(queryResult.rows[0]);
};

export const readUsersService = async (): Promise<TUserRead> => {
  const queryResult: TUserResult = await client.query('SELECT * FROM "users";');

  return userReadSchema.parse(queryResult.rows);
};

export const readUserCoursesService = async (id: string) => {
  const queryString: string = `
  SELECT
    "c".id AS "courseId",
    "c".name AS "courseName",
    "c".description AS "courseDescription",
    "uc".active AS "userActiveInCourse",
    "u".id AS "userId",
    "u".name AS "userName"
  FROM 
    "users" AS "u"
  JOIN 
    "userCourses" AS "uc" ON "u".id = "uc"."userId"
  JOIN 
    "courses" AS "c" ON "c".id = "uc"."courseId"
  WHERE
    "u".id = (%L);
  `;

  const queryFormat: string = format(queryString, id);
  const queryResult: TUserCoursesResult = await client.query(queryFormat);

  return queryResult.rows;
};
