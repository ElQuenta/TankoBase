import * as FavoriteService from '../services/favorite.service.js';

import { CreatedResponseHandler, SuccessResponseHandler, NoContentResponseHandler } from '../handlers/success.handler.js';
import { ErrorResponseHandler } from '../handlers/error.handler.js';

export const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await FavoriteService.getFavoritesByUserId(userId);
    SuccessResponseHandler(res, favorites);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};

export const addFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { workId } = req.params;
    const favorite = await FavoriteService.addFavorite(userId, workId);
    CreatedResponseHandler(res, favorite);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { workId } = req.params;
    await FavoriteService.removeFavorite(userId, workId);
    NoContentResponseHandler(res);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};
