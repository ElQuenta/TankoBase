import Joi from "joi";

const mongoId = Joi.string().hex().length(24);

export const createCommentSchema = Joi.object({
  content: Joi.string().required(),
  workId: mongoId.optional(),
  chapterId: mongoId.optional(),
  parentCommentId: mongoId.optional()
}).or("workId", "chapterId", "parentCommentId");

export const updateCommentSchema = Joi.object({
  content: Joi.string().required()
});

export const commentParamSchema = Joi.object({
  id: mongoId.required()
});

export const commentWorkParamSchema = Joi.object({
  workId: mongoId.required()
});

export const commentChapterParamSchema = Joi.object({
  chapterId: mongoId.required()
});
