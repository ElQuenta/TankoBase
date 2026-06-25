import { Router } from "express";

import * as CommentController from "../controller/comment.controller.js";

import { authenticate } from '../middlewares/auth.middleware.js';
import { validateBody } from '../middlewares/validateBody.middleware.js';
import { validateParams } from '../middlewares/validateParams.middleware.js';
import {
  createCommentSchema,
  updateCommentSchema,
  commentParamSchema,
  commentWorkParamSchema,
  commentChapterParamSchema
} from '../middlewares/schemas/comment.schema.js';

const router = Router();

router.route("/work/:workId")
  .get(validateParams(commentWorkParamSchema), CommentController.getCommentsByWork);

router.route("/chapter/:chapterId")
  .get(validateParams(commentChapterParamSchema), CommentController.getCommentsByChapter);

router.route("/")
  .post(authenticate, validateBody(createCommentSchema), CommentController.createComment);

router.route("/:id")
  .put(authenticate, validateParams(commentParamSchema), validateBody(updateCommentSchema), CommentController.updateComment)
  .delete(authenticate, validateParams(commentParamSchema), CommentController.deleteComment);

export default router;
