import { prisma } from "../config/prisma.js";

export async function getFollowsByUserId(userId) {
  return prisma.follow.findMany({
    where: {
      userId,
      deletedAt: null
    }
  });
}

export async function findFollow(userId, seriesId) {
  return prisma.follow.findFirst({
    where: {
      userId,
      seriesId,
      deletedAt: null
    }
  });
}

export async function createFollow(userId, seriesId) {
  return prisma.follow.create({
    data: {
      userId,
      seriesId
    }
  });
}

export async function deleteFollow(userId, seriesId) {
  return prisma.follow.delete({
    where: {
      userId_seriesId: {
        userId,
        seriesId
      }
    }
  });
}
