import Express from 'express';
import { requestLogger } from './middlewares/logger.middleware.js';

import authRoutes from './routes/auth.routes.js';

const app = Express();

app.use(Express.json());
app.use(requestLogger);

app.use('/api/auth', authRoutes);

export default app;