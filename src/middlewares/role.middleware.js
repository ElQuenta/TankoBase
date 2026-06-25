import { AppError } from '../utils/appError.util.js';
import { ErrorResponseHandler } from '../handlers/error.handler.js';

export function authorize(allowedRoles) {
  return (req, res, next) => {
    try {
      if (!req.user) {
        throw new AppError('Unauthorized', 401);
      }
      if (!allowedRoles.includes(req.user.role)) {
        throw new AppError('Forbidden', 403);
      }
      next();
    } catch (error) {
      const appError = error instanceof AppError ? error : new AppError('Forbidden', 403);
      ErrorResponseHandler(res, appError);
    }
  };
}