import { z } from "zod";
import {
  courseCreateShema,
  courseReadShema,
  courseSchema,
} from "../schemas/cousres.schema";
import { QueryResult } from "pg";

export type TCourse = z.infer<typeof courseSchema>;

export type TCourseCreate = z.infer<typeof courseCreateShema>;
export type TCourseRead = z.infer<typeof courseReadShema>;

export type TCourseResult = QueryResult<TCourse>;
