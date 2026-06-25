import { Router } from "express";

import * as FavoriteController from "../controller/favorite.controller.js";

import { authenticate } from '../middlewares/auth.middleware.js';
import { validateParams } from '../middlewares/validateParams.middleware.js';
import { favoriteWorkParamSchema } from '../middlewares/schemas/favorite.schema.js';

const router = Router();

router.route("/")
  .get(authenticate, FavoriteController.getFavorites);

router.route("/:workId")
  .post(authenticate, validateParams(favoriteWorkParamSchema), FavoriteController.addFavorite)
  .delete(authenticate, validateParams(favoriteWorkParamSchema), FavoriteController.removeFavorite);

export default router;
