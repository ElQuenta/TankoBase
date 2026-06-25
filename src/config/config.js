import dotenv from 'dotenv';

dotenv.config();

const {
  MONGODB_URI: mongoUri,
  PORT: port = 3000,
  DATABASE_URL: databaseUrl,
  BLOB_READ_WRITE_TOKEN: vercelBlobToken,
  LOG_LEVEL: logLevel = 'info'
} = process.env;

const config = {
  server: {
    port: parseInt(port, 10),
    logLevel: logLevel
  },
  database: {
    mongoUri: mongoUri,
    databaseUrl: databaseUrl
  },
  blob: {
    readWriteToken: vercelBlobToken
  }

}

export default config;