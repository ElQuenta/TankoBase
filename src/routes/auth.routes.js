import { Router } from "express";

import * as AuthController from "../controller/auth.controller.js";

import { validateBody } from '../middlewares/validateBody.middleware.js';
import { loginSchema, registerSchema } from "../middlewares/schemas/auth.schema.js";

const router = Router();

router.route('/register').post(validateBody(registerSchema), AuthController.register);
router.route('/login').post(validateBody(loginSchema), AuthController.login);

export default router;