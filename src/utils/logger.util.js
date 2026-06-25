import winston from "winston";

import config from '../config/config.js';
import { AppError } from "./errorApp.util.js";

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
    logger.error(message, {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
  }

  throw error instanceof AppError ? error : new AppError(message, 500);
}
