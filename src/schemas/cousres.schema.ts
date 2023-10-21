import { z } from "zod";

export const courseSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(15),
  description: z.string(),
});

export const courseCreateShema = courseSchema.omit({ id: true });
export const courseReadShema = courseSchema.array();
