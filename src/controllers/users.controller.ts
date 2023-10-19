import { Request, Response } from "express";
import { TUserCreate } from "../__tests__/mocks/interfaces";
import { TUserRead, TUserReturn } from "../interfaces/users.interface";
import { createUserService, readUsersService } from "../services/users.service";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: TUserCreate = req.body;
  const newUser: TUserReturn = await createUserService(data);

  return res.status(201).json(newUser);
};

export const readUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users: TUserRead = await readUsersService();

  return res.status(200).json(users);
};
