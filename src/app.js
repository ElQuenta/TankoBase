import Express from 'express';
import { requestLogger } from './middlewares/logger.middleware.js';

import authRoutes from './routes/auth.routes.js';
import workRoutes from './routes/work.routes.js';
import chapterRoutes from './routes/chapter.routes.js';

const app = Express();

app.use((req, res, next) => {
  if (req.is('multipart/form-data')) return next();
  Express.json()(req, res, next);
});
app.use(requestLogger);

app.use('/api/auth', authRoutes);
app.use('/api/work', workRoutes);
app.use('/api/chapter', chapterRoutes);

export default app;