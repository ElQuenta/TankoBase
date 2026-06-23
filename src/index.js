import app from "./app.js";
import config from "./config/config.js";
import { connectDB } from "./config/mongo.js";
import { connectDatabase} from './config/prisma.js';

app.listen(config.server.port, async () => {
  await connectDB();
  await connectDatabase();
  console.log(`Server is running on http://localhost:${config.server.port}`);
});