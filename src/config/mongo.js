import mongoose from "mongoose";

import config from "./config.js";
import { createLogger } from "../utils/logger.util.js";

const logger = createLogger("Database MongoDB");

export async function connectDB() {
  try {
    logger.debug(`Attempting to connect to MongoDB with URI: ${config.database.mongoUri}`);
    await mongoose.connect(config.database.mongoUri);
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", { error });
    process.exit(1);
  }
}