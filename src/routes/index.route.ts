import { Router } from "express";
import { usersRoutes } from "./users.route";
import { sessionRoute } from "./session.route";
import { coursesRoutes } from "./courses.route";

export const routes: Router = Router();

routes.use("/users", usersRoutes);
routes.use("/login", sessionRoute);
routes.use("/courses", coursesRoutes);
