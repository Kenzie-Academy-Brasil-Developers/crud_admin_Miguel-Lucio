import { z } from "zod";

export const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50).min(1),
  email: z.string().max(50).email(),
  password: z.string().max(120),
  admin: z.boolean().default(false),
});

export const userCoursesSchema = z.object({
  couseId: z.number().positive(),
  courseName: z.string().max(15),
  courseDescription: z.string(),
  userActiveInCourse: z.boolean(),
  userId: z.number().positive(),
  userName: z.string().max(50),
});

export const userCreateSchema = userSchema.omit({ id: true });
export const userUpdateSchema = userCreateSchema.partial();
export const userReturnSchema = userSchema.omit({ password: true });
export const userReadSchema = userReturnSchema.array();
