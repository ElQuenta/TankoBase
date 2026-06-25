import { Router } from "express";

import * as workController from "../controller/work.controller.js";

import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { validateBody} from '../middlewares/validateBody.middleware.js';
import { validateParams} from '../middlewares/validateParams.middleware.js';
import { validateQuery} from '../middlewares/validateQuery.middleware.js';
import { uploadSingleCover, uploadOptionalSingleCover} from '../middlewares/uploadSingle.middleware.js';
import { createWorkSchema, updateWorkSchema, workParamSchema, workQuerySchema } from '../middlewares/schemas/work.schema.js';

const router = Router();

router.route("/")
  .get(validateQuery(workQuerySchema), workController.getAllWorks)
  .post(authenticate, authorize(["ADMINISTRATOR", "EDITOR"]), uploadSingleCover("cover"), validateBody(createWorkSchema), workController.createWork);

router.route("/:id")
  .get(validateParams(workParamSchema), workController.getWorkById)
  .put(authenticate, authorize(["ADMINISTRATOR", "EDITOR"]), validateParams(workParamSchema), uploadOptionalSingleCover("cover"), validateBody(updateWorkSchema), workController.updateWork)
  .delete(authenticate, authorize(["ADMINISTRATOR"]), validateParams(workParamSchema), workController.deleteWork);

export default router;