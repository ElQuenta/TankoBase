import Joi from "joi";

import { WORK_STATUS, WORK_TYPES } from "../../utils/work.constants.js";

export const createWorkSchema = Joi.object({
  title: Joi.string().required(),
  synopsis: Joi.string().optional().allow(""),
  banner: Joi.string().required(),
  type: Joi.string()
    .valid(...WORK_TYPES)
    .required(),
  status: Joi.string()
    .valid(...WORK_STATUS)
    .optional(),
  genres: Joi.array().items(Joi.string()).min(1).required()
});

export const updateWorkSchema = Joi.object({
  title: Joi.string().optional(),
  synopsis: Joi.string().optional().allow(""),
  banner: Joi.string().optional(),
  type: Joi.string()
    .valid(...WORK_TYPES)
    .optional(),
  status: Joi.string()
    .valid(...WORK_STATUS)
    .optional(),
  genres: Joi.array().items(Joi.string()).min(1).optional(),
  visits: Joi.number().integer().min(0).optional(),
  followers: Joi.number().integer().min(0).optional()
}).min(1);

export const workParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});

export const workQuerySchema = Joi.object({
  title: Joi.string().optional(),
  status: Joi.string()
    .valid(...WORK_STATUS)
    .optional(),
  type: Joi.string()
    .valid(...WORK_TYPES)
    .optional(),
  genre: Joi.string().optional()
});
