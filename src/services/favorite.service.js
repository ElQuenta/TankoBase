import * as FavoriteData from "../data/favorite.data.js";
import { Work } from "../data/works.js";
import { AppError } from "../utils/errorApp.util.js";
import { createLogger, catchAndLogError } from "../utils/logger.util.js";

const logger = createLogger("FavoriteService");

export async function getFavoritesByUserId(userId) {
  try {
    return await FavoriteData.getFavoritesByUserId(userId);
  } catch (error) {
    catchAndLogError(logger, error, "Error fetching favorites");
  }
}

export async function addFavorite(userId, workId) {
  try {
    const work = await Work.findById(workId);

    if (!work) {
      throw new AppError("Work not found", 404);
    }

    const existingFavorite = await FavoriteData.findFavorite(userId, workId);

    if (existingFavorite) {
      throw new AppError("Work is already in favorites", 400);
    }

    const favorite = await FavoriteData.createFavorite(userId, workId);
    logger.verbose("Favorite added", { userId, workId });
    return favorite;
  } catch (error) {
    catchAndLogError(logger, error, "Error adding favorite");
  }
}

export async function removeFavorite(userId, workId) {
  try {
    const existingFavorite = await FavoriteData.findFavorite(userId, workId);

    if (!existingFavorite) {
      return null;
    }

    const deletedFavorite = await FavoriteData.deleteFavorite(userId, workId);
    logger.verbose("Favorite removed", { userId, workId });
    return deletedFavorite;
  } catch (error) {
    catchAndLogError(logger, error, "Error removing favorite");
  }
}
