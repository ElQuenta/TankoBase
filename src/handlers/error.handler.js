import { AppError } from '../utils/errorApp.util.js';

export function GetErrorCode(err) {
  if (err instanceof AppError) {
    return { statusCode: err.statusCode, message: err.message };
  }

  return {
    statusCode: 500,
    message: err instanceof Error ? err.message : 'Internal Server Error'
  };
}

export function ErrorResponseHandler(res, err) {
  const { statusCode, message } = GetErrorCode(err);
  res.status(statusCode).json({
    success: false,
    code: statusCode,
    error: { message },
  });
}
