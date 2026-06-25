import * as FavoriteData from "../data/favorite.data.js";
import { Work } from "../data/works.js";
import { AppError } from "../utils/errorApp.util.js";

export async function getFavoritesByUserId(userId) {
  const favorites = await FavoriteData.getFavoritesByUserId(userId);
  return favorites;
}

export async function addFavorite(userId, workId) {
  const work = await Work.findById(workId);

  if (!work) {
    throw new AppError("Work not found", 404);
  }

  const existingFavorite = await FavoriteData.findFavorite(userId, workId);

  if (existingFavorite) {
    throw new AppError("Work is already in favorites", 400);
  }

  const favorite = await FavoriteData.createFavorite(userId, workId);
  return favorite;
}

export async function removeFavorite(userId, workId) {
  const existingFavorite = await FavoriteData.findFavorite(userId, workId);

  if (!existingFavorite) {
    return null;
  }

  const deletedFavorite = await FavoriteData.deleteFavorite(userId, workId);
  return deletedFavorite;
}
