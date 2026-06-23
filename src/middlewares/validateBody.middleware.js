import Joi from 'joi';
import { AppError } from '../utils/errorApp.util.js';
import { ErrorResponseHandler } from '../handlers/error.handler.js';

export function validateBody(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      convert: true,
    });

    if (error) {
      const details = error.details.map((d) => d.message).join(', ');

      ErrorResponseHandler(
        new AppError(`Validation error: ${details}`, 400),
        req,
        res
      );

      return;
    }

    req.body = value;
    next();
  };
}