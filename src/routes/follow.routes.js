import { Router } from "express";

import * as FollowController from "../controller/follow.controller.js";

import { authenticate } from '../middlewares/auth.middleware.js';
import { validateParams } from '../middlewares/validateParams.middleware.js';
import { followWorkParamSchema } from '../middlewares/schemas/follow.schema.js';

const router = Router();

router.route("/")
  .get(authenticate, FollowController.getFollows);

router.route("/:workId")
  .post(authenticate, validateParams(followWorkParamSchema), FollowController.addFollow)
  .delete(authenticate, validateParams(followWorkParamSchema), FollowController.removeFollow);

export default router;
