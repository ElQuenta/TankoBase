import { Router } from "express";

import * as ReadingProgressController from "../controller/readingProgress.controller.js";

import { authenticate } from '../middlewares/auth.middleware.js';
import { validateBody } from '../middlewares/validateBody.middleware.js';
import { validateParams } from '../middlewares/validateParams.middleware.js';
import {
  createReadingProgressSchema,
  readingProgressParamSchema
} from '../middlewares/schemas/readingProgress.schema.js';

const router = Router();

router.route("/")
  .get(authenticate, ReadingProgressController.getReadingProgress)
  .post(authenticate, validateBody(createReadingProgressSchema), ReadingProgressController.createReadingProgress);

router.route("/:workId/:chapterId")
  .delete(authenticate, validateParams(readingProgressParamSchema), ReadingProgressController.deleteReadingProgress);

export default router;
