import { Request, Response } from "express";
import {
  createCourseService,
  linkCourseUserService,
  readCoursesService,
  readUsersActiveInCourseService,
  removeCourseUserService,
} from "../services/courses.service";
import { TCourse, TCourseRead } from "../interfaces/courses.interface";

export const createCourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newCourse: TCourse = await createCourseService(req.body);

  return res.status(201).json(newCourse);
};

export const readCoursesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const courses: TCourseRead = await readCoursesService();

  return res.status(200).json(courses);
};

export const linkCourseUserControler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { courseId, userId } = req.params;
  await linkCourseUserService(courseId, userId);

  return res
    .status(201)
    .json({ message: "User successfully vinculed to course" });
};

export const removeCourseUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { courseId, userId } = req.params;
  await removeCourseUserService(courseId, userId);

  return res.status(204).json();
};

export const readUsersActiveInCourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const usersActiveInCourse = await readUsersActiveInCourseService(
    req.params.id
  );

  return res.status(200).json(usersActiveInCourse);
};
