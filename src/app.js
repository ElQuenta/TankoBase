import Express from 'express';
import { createRequire } from 'module';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'yaml';
import swaggerUi from 'swagger-ui-express';
import { requestLogger } from './middlewares/logger.middleware.js';

import authRoutes from './routes/auth.routes.js';
import workRoutes from './routes/work.routes.js';
import chapterRoutes from './routes/chapter.routes.js';
import commentRoutes from './routes/comment.routes.js';
import favoriteRoutes from './routes/favorite.routes.js';
import followRoutes from './routes/follow.routes.js';
import readingProgressRoutes from './routes/readingProgress.routes.js';
import userRoutes from './routes/user.routes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const swaggerDocument = yaml.parse(
  readFileSync(resolve(__dirname, '../openapi.yaml'), 'utf-8')
);

const app = Express();

app.use(requestLogger);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', authRoutes);
app.use('/api/work', workRoutes);
app.use('/api/chapter', chapterRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/favorite', favoriteRoutes);
app.use('/api/follow', followRoutes);
app.use('/api/reading-progress', readingProgressRoutes);
app.use('/api/user', userRoutes);

export default app;