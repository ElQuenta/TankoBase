import { Router } from "express";

import * as ChapterController from "../controller/chapter.controller.js";

import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { validateBody} from '../middlewares/validateBody.middleware.js';
import { validateParams} from '../middlewares/validateParams.middleware.js';
import { validateQuery} from '../middlewares/validateQuery.middleware.js';
import { uploadChapterImages, uploadChapterImagesOptional} from '../middlewares/uploadMultiple.middleware.js'
import { createChapterSchema, updateChapterSchema, chapterParamSchema, chapterUpdateTypeSchema } from '../middlewares/schemas/chapter.schema.js';

const router = Router();

router.route("/")
  .post(authenticate, authorize(["ADMINISTRATOR", "EDITOR"]), uploadChapterImages, validateBody(createChapterSchema), ChapterController.createChapter);

router.route("/:id")
  .get(validateParams(chapterParamSchema), ChapterController.getChapterById)
  .put(authenticate, authorize(["ADMINISTRATOR", "EDITOR"]), uploadChapterImagesOptional, validateParams(chapterParamSchema), validateQuery(chapterUpdateTypeSchema), validateBody(updateChapterSchema), ChapterController.updateChapter)
  .delete(authenticate, authorize(["ADMINISTRATOR"]), validateParams(chapterParamSchema), ChapterController.deleteChapter);

export default router;