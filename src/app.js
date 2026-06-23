import Express from 'express';
import { requestLogger } from './middlewares/logger.middleware.js';

const app = Express();

app.use(Express.json());
app.use(requestLogger);

export default app;