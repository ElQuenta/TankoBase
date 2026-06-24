import mongoose from "mongoose";

import config from "./config.js";
import { createLogger } from "../utils/logger.util.js";

const logger = createLogger("Database MongoDB");

export async function connectDB() {
  try {
    await mongoose.connect(config.database.mongoUri);
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("Failed to connect to MongoDB", { error: error.message, stack: error.stack });
    process.exit(1);
  }
}