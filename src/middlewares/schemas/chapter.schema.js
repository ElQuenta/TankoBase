import Joi from "joi";

import { CHAPTER_STATUS } from "../../utils/work.constants.js";

const mongoId = Joi.string().hex().length(24);

export const createChapterSchema = Joi.object({
  workId: mongoId.required(),
  number: Joi.number().integer().positive().required(),
  publishedAt: Joi.date().optional(),
  status: Joi.string()
    .valid(...CHAPTER_STATUS)
    .optional(),
  images: Joi.array().items(Joi.string()).optional()
});

export const updateChapterSchema = Joi.object({
  number: Joi.number().integer().positive().optional(),
  publishedAt: Joi.date().optional(),
  status: Joi.string()
    .valid(...CHAPTER_STATUS)
    .optional(),
  images: Joi.array().items(Joi.string()).optional()
}).min(1);

export const chapterParamSchema = Joi.object({
  id: mongoId.required()
});
