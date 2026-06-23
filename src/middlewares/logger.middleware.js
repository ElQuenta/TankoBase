import { createLogger } from "../utils/logger.util.js";

const logger = createLogger("Request");

export function requestLogger(req, res, next) {
  const start = Date.now();

  logger.http("Request received", {
    method: req.method,
    url: req.originalUrl || req.url
  });

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.http("Request resolved", {
      method: req.method,
      url: req.originalUrl || req.url,
      status: res.statusCode,
      duration: `${duration}ms`
    });
  });

  next();
}