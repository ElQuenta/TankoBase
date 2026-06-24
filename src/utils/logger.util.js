import winston from "winston";

import config from '../config/config.js';

const rootLogger = winston.createLogger({
  level: config.server.logLevel,
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.metadata({ fillExcept: ["level", "message", "timestamp", "context", "stack"] })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        winston.format.printf(({ timestamp, level, message, context, stack, metadata }) => {
          const meta =
            metadata && Object.keys(metadata).length > 0
              ? ` ${JSON.stringify(metadata)}`
              : "";

          return `${timestamp} ${level} [${context}] ${stack ?? message}${meta}`;
        })
      ),
    }),
  ],
});

export function createLogger(context) {
  return rootLogger.child({ context });
}

export function catchAndLogError(logger, error, message) {
  if (!(error instanceof AppError)) {
    const errorDetails = getErrorDetails(error)
    logger.error(message, { error: errorDetails });
  }
  throw error instanceof AppError ? error : new AppError(message, 500);
}

export function getErrorDetails(error) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack
    };
  }

  return { error };
}