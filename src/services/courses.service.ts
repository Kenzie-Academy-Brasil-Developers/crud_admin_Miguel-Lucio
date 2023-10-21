import format from "pg-format";
import {
  TCourse,
  TCourseCreate,
  TCourseRead,
  TCourseResult,
} from "../interfaces/courses.interface";
import { client } from "../database";

export const createCourseService = async (
  data: TCourseCreate
): Promise<TCourse> => {
  const queryFormat: string = format(
    'INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;',
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: TCourseResult = await client.query(queryFormat);

  return queryResult.rows[0];
};

export const readCoursesService = async (): Promise<TCourseRead> => {
  const queryResult: TCourseResult = await client.query(
    'SELECT * FROM "courses";'
  );

  return queryResult.rows;
};

export const linkCourseUserService = async (
  courseId: string,
  userId: string
): Promise<void> => {
  const data = { courseId, userId };

  const queryFormat: string = format(
    'INSERT INTO "userCourses" (%I) VALUES (%L) RETURNING *;',
    Object.keys(data),
    Object.values(data)
  );

  await client.query(queryFormat);
};

export const removeCourseUserService = async (
  courseId: string,
  userId: string
): Promise<void> => {
  await client.query(
    `UPDATE
      "userCourses"
    SET
      "active" = false
    WHERE 
      "userCourses"."courseId" = $1
    AND 
      "userCourses"."userId" = $2;`,
    [courseId, userId]
  );
};

export const readUsersActiveInCourseService = async (id: string) => {
  const queryString: string = `
  SELECT
    "uc"."userId",
    "u"."name" AS "userName",
    "uc"."courseId",
    "c"."name" AS "courseName",
    "c"."description" AS "courseDescription",
    "uc"."active" AS "userActiveInCourse"
  FROM "userCourses" AS "uc"
    JOIN "users" AS "u"
    ON "uc"."userId" = "u"."id"
    JOIN "courses" AS "c"
    ON "uc"."courseId" = "c"."id"
  WHERE "uc"."courseId" = (%L);`;

  const queryFormat: string = format(queryString, id);
  const queryResult = await client.query(queryFormat);

  return queryResult.rows;
};
