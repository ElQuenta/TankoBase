import { prisma } from "../config/prisma.js";

export async function getFavoritesByUserId(userId) {
  return prisma.favorite.findMany({
    where: {
      userId,
      deletedAt: null
    }
  });
}

export async function findFavorite(userId, seriesId) {
  return prisma.favorite.findFirst({
    where: {
      userId,
      seriesId,
      deletedAt: null
    }
  });
}

export async function createFavorite(userId, seriesId) {
  return prisma.favorite.create({
    data: {
      userId,
      seriesId
    }
  });
}

export async function deleteFavorite(userId, seriesId) {
  return prisma.favorite.delete({
    where: {
      userId_seriesId: {
        userId,
        seriesId
      }
    }
  });
}
