import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { userCreateSchema } from "../schemas/users.schema";
import { verifyEmail } from "../middlewares/verifyEmail.middleware";
import {
  createUserController,
  readUsersController,
} from "../controllers/users.controller";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "/",
  validateBody(userCreateSchema),
  verifyEmail,
  createUserController
);

usersRoutes.get("/", readUsersController);
