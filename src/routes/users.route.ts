import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { userCreateSchema } from "../schemas/users.schema";
import { verifyEmail } from "../middlewares/verifyEmail.middleware";
import {
  createUserController,
  readUsersController,
} from "../controllers/users.controller";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermissions } from "../middlewares/verifyPermissions.middleware";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "/",
  validateBody(userCreateSchema),
  verifyEmail,
  createUserController
);

usersRoutes.get("/", verifyToken, verifyPermissions, readUsersController);
