import jwt from 'jsonwebtoken';

import { AppError } from '../utils/appError.util.js';
import { ErrorResponseHandler } from '../handlers/error.handler.js';
import config from '../config/config.js';


export function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Unauthorized', 401);
    }
    const token = authHeader.slice(7);
    const decoded = jwt.verify(token, config.server.jwtSecret);
    req.user = { id: Number(decoded.id), role: decoded.role };
    next();
  } catch (error) {
    const appError = error instanceof AppError ? error : new AppError('Unauthorized', 401);
    ErrorResponseHandler(res, appError);
  }
}