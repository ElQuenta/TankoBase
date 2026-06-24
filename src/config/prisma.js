import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

import config from "./config.js";
import { createLogger, getErrorDetails } from "../utils/logger.util.js";

const logger = createLogger("Database Prisma");

const adapter = new PrismaPg({
  connectionString: config.database.databaseUrl
});

export const prisma = new PrismaClient({ adapter });

export async function connectDatabase() {
  try {
    await prisma.$connect();
    logger.info("Prisma connected successfully");
  } catch (error) {
    logger.error("Failed to connect to Prisma:", { error: getErrorDetails(error) });
    process.exit(1);
  }
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
}