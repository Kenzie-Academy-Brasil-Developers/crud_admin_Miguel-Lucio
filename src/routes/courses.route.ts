import { Router } from "express";
import {
  createCourseController,
  linkCourseUserControler,
  readCoursesController,
  readUsersActiveInCourseController,
  removeCourseUserController,
} from "../controllers/courses.controller";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermissions } from "../middlewares/verifyPermissions.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import { courseCreateShema } from "../schemas/cousres.schema";
import { verifyUserOrCourse } from "../middlewares/verifyUserOrCourse.middleware";

export const coursesRoutes: Router = Router();

coursesRoutes.post(
  "/",
  verifyToken,
  verifyPermissions,
  validateBody(courseCreateShema),
  createCourseController
);
coursesRoutes.get("/", readCoursesController);

coursesRoutes.use(
  "/:courseId/users/:userId",
  verifyToken,
  verifyPermissions,
  verifyUserOrCourse
);
coursesRoutes.post("/:courseId/users/:userId", linkCourseUserControler);
coursesRoutes.delete("/:courseId/users/:userId", removeCourseUserController);

coursesRoutes.get(
  "/:id/users",
  verifyToken,
  verifyPermissions,
  readUsersActiveInCourseController
);
