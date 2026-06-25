import Joi from "joi";

const uuidV4 = Joi.string().uuid({ version: 'uuidv4' });

export const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("ADMINISTRATOR", "READER", "EDITOR").required(),
});

export const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  role: Joi.string().valid("ADMINISTRATOR", "READER", "EDITOR").optional(),
}).min(1);

export const userParamSchema = Joi.object({
  id: uuidV4.required(),
});
