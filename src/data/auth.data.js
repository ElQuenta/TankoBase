import { prisma } from '../config/prisma.js';

export const getUserByEmail = async (email) => {
  return await prisma.user.findFirst({
    where: {
      email: email,
      deletedAt: null,
    },
  });
}

export const getUserByUsername = async (username) => {
  return await prisma.user.findFirst({
    where: {
      username: username,
      deletedAt: null,
    },
  });
}

export const createUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
  });
}