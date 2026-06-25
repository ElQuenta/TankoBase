import { Router } from "express";

import * as UserController from "../controller/user.controller.js";

import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { validateBody } from '../middlewares/validateBody.middleware.js';
import { validateParams } from '../middlewares/validateParams.middleware.js';
import { createUserSchema, updateUserSchema, userParamSchema } from '../middlewares/schemas/user.schema.js';

const router = Router();

router.use(authenticate, authorize(["ADMINISTRATOR"]));

router.route("/")
  .get(UserController.getAllUsers)
  .post(validateBody(createUserSchema), UserController.createUser);

router.route("/:id")
  .get(validateParams(userParamSchema), UserController.getUserById)
  .put(validateParams(userParamSchema), validateBody(updateUserSchema), UserController.updateUser)
  .delete(validateParams(userParamSchema), UserController.deleteUser);

export default router;
