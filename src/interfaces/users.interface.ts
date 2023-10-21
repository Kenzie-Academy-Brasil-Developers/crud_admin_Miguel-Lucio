import { z } from "zod";
import {
  userCreateSchema,
  userReadSchema,
  userReturnSchema,
  userSchema,
  userUpdateSchema,
} from "../schemas/users.schema";
import { QueryResult } from "pg";

export type TUser = z.infer<typeof userSchema>;
export type TUserCourses = {
  couseId: number;
  courseName: string;
  courseDescription: string;
  userActiveInCourse: boolean;
  userId: number;
  userName: string;
};

export type TUserCreate = z.infer<typeof userCreateSchema>;
export type TUserRead = z.infer<typeof userReadSchema>;
export type TUserUpdate = z.infer<typeof userUpdateSchema>;
export type TUserReturn = z.infer<typeof userReturnSchema>;

export type TUserResult = QueryResult<TUser>;
export type TUserCoursesResult = QueryResult<TUserCourses>;
