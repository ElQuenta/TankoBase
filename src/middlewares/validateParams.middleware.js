import Joi from 'joi';
import { AppError } from '../utils/errorApp.util.js';
import { ErrorResponseHandler } from '../handlers/error.handler.js';

export function validateParams(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      convert: true,
    });

    if (error) {
      const details = error.details.map((d) => d.message).join(', ');
      ErrorResponseHandler(
        res,
        new AppError(`Validation error: ${details}`, 400)
      );
      return;
    }

    req.params = value;
    next();
  };
}
