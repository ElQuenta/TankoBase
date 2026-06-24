import Joi from 'joi';
import { AppError } from '../utils/errorApp.util.js';
import { ErrorResponseHandler } from '../handlers/error.handler.js';

export function validateQuery(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      convert: true,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((d) => d.message).join(', ');

      ErrorResponseHandler(
        res,
        new AppError(`Validation error: ${details}`, 400)
      );

      return;
    }
    next();
  };
}