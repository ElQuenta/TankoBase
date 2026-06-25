import { prisma } from "../config/prisma.js";

export async function getReadingProgressByUserId(userId) {
  return prisma.readingProgress.findMany({
    where: {
      userId,
      deletedAt: null
    }
  });
}

export async function findReadingProgress(userId, seriesId, episodeId) {
  return prisma.readingProgress.findFirst({
    where: {
      userId,
      seriesId,
      episodeId,
      deletedAt: null
    }
  });
}

export async function getReadingProgressByWork(userId, seriesId) {
  return prisma.readingProgress.findMany({
    where: {
      userId,
      seriesId,
      deletedAt: null
    },
    orderBy: {
      createdAt: "desc"
    }
  });
}

export async function createReadingProgress(userId, seriesId, episodeId) {
  return prisma.readingProgress.create({
    data: {
      userId,
      seriesId,
      episodeId
    }
  });
}

export async function softDeleteReadingProgress(userId, seriesId, episodeId) {
  return prisma.readingProgress.update({
    where: {
      userId_seriesId_episodeId: {
        userId,
        seriesId,
        episodeId
      }
    },
    data: {
      deletedAt: new Date()
    }
  });
}
