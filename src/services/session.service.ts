import { client } from "../database";
import AppError from "../errors/AppError.error";
import {
  TSessionCreate,
  TSessionReturn,
} from "../interfaces/session.interface";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { TUserResult } from "../interfaces/users.interface";

export const loginService = async (
  data: TSessionCreate
): Promise<TSessionReturn> => {
  const queryString = `SELECT * FROM "users" WHERE "email" = $1;`;
  const queryResult: TUserResult = await client.query(queryString, [
    data.email,
  ]);

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }

  const user = queryResult.rows[0];

  const verifyPass: boolean = await compare(data.password, user.password);
  if (!verifyPass) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = sign(
    { email: user.email, admin: user.admin },
    process.env.SECRET_KEY!,
    { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );

  return { token };
};
