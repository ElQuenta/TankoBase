import Joi from "joi";

import { CHAPTER_STATUS } from "../../utils/work.constants.js";

const mongoId = Joi.string().hex().length(24);

export const createChapterSchema = Joi.object({
  workId: mongoId.required(),
  number: Joi.number()
    .positive()
    .precision(1)
    .required(),
  vercelId: Joi.string().uuid().optional(),
  status: Joi.string()
    .valid(...CHAPTER_STATUS)
    .optional(),
  images: Joi.array().items(Joi.string()).optional()
});

export const updateChapterSchema = Joi.object({
  status: Joi.string()
    .valid(...CHAPTER_STATUS)
    .optional(),
  images: Joi.array().items(Joi.string()).optional()
}).min(1);

export const chapterParamSchema = Joi.object({
  id: mongoId.required()
});

export const chapterUpdateTypeSchema = Joi.object({
  type: Joi.string().valid("REPOST", "APPEND", "STAND").required()
});
