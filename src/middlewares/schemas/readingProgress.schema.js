import Joi from "joi";

const mongoId = Joi.string().hex().length(24);

export const createReadingProgressSchema = Joi.object({
  workId: mongoId.required(),
  chapterId: mongoId.required()
});

export const readingProgressParamSchema = Joi.object({
  workId: mongoId.required(),
  chapterId: mongoId.required()
});
