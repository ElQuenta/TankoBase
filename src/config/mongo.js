import mongoose from "mongoose";

import config from "./config.js";
import { createLogger, getErrorDetails } from "../utils/logger.util.js";

const logger = createLogger("Database MongoDB");

export async function connectDB() {
  try {
    await mongoose.connect(config.database.mongoUri);
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", { error: getErrorDetails(error) });
    process.exit(1);
  }
}