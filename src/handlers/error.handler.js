import { request, response } from 'express';
import { AppError } from '../utils/errorApp.util.js';

export function GetErrorCode(err) {
  if (err instanceof AppError) {
    return { statusCode: err.statusCode, message: err.message };
  }
  return { statusCode: 501, message: 'Not Implemented' };
}

export function ErrorResponseHandler(res, err) {
  const { statusCode, message } = GetErrorCode(err);
  res.status(statusCode).json({
    success: false,
    code: statusCode,
    error: { message },
  });
}
