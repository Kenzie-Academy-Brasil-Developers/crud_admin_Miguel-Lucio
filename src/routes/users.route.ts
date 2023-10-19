import { Router } from "express";
import { createUserController } from "../controllers/users.controller";
import { validateBody } from "../middlewares/validateBody.middleware";
import { userCreateSchema } from "../schemas/users.schema";
import { verifyEmail } from "../middlewares/verifyEmail.middleware";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "/",
  validateBody(userCreateSchema),
  verifyEmail,
  createUserController
);
