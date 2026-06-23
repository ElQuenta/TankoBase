import joi from 'joi';

/* Body Schemas */

export const courseSchema = joi.object({
  name: joi.string().required(),
  degree: joi.string().required(),
  lecturer: joi.string().required(),
  schedule: joi.string().required().valid('A+', 'B+', 'A', 'B', 'C', 'D', 'E', 'Z'),
  credits: joi.number().integer().positive().required().max(10),
  active: joi.boolean().required()
});

export const patchCourseSchema = joi.object({
  name: joi.string().optional(),
  degree: joi.string().optional(),
  lecturer: joi.string().optional(),
  schedule: joi.string().optional().valid('A+', 'B+', 'A', 'B', 'C', 'D', 'E', 'Z'),
  credits: joi.number().integer().positive().optional().max(10),
  active: joi.boolean().optional()
}).min(1);

/* Param Schemas */

export const courseParamSchema = joi.object({
  id: joi.string().required().length(24).hex()
});

/* Query Schemas */

export const courseQuerySchema = joi.object({
  schedule: joi.string().valid('A+', 'B+', 'A', 'B', 'C', 'D', 'E', 'Z').optional(),
  credits: joi.number().integer().positive().max(10).optional(),
  active: joi.boolean().optional()
});