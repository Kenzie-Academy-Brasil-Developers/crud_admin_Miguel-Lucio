import { Request, Response } from "express";
import { TSessionReturn } from "../interfaces/session.interface";
import { loginService } from "../services/session.service";

export const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token: TSessionReturn = await loginService(req.body);

  return res.status(200).json(token);
};
