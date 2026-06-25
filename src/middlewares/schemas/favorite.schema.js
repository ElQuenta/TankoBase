import Joi from "joi";

const mongoId = Joi.string().hex().length(24);

export const favoriteWorkParamSchema = Joi.object({
  workId: mongoId.required()
});
