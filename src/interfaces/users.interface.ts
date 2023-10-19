import { z } from "zod";
import {
  userCreateSchema,
  userReturnSchema,
  userSchema,
  userUpdateSchema,
} from "../schemas/users.schema";
import { QueryResult } from "pg";

export type TUser = z.infer<typeof userSchema>;

export type TUserCreate = z.infer<typeof userCreateSchema>;
export type TUserRead = Array<TUser>;
export type TUserUpdate = z.infer<typeof userUpdateSchema>;
export type TUserReturn = z.infer<typeof userReturnSchema>;

export type TUserResult = QueryResult<TUser>;
