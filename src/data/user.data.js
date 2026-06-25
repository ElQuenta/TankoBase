import { prisma } from '../config/prisma.js';

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    where: { deletedAt: null },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getUserById = async (id) => {
  return await prisma.user.findFirst({
    where: { id, deletedAt: null },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const createUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

export const updateUser = async (id, userData) => {
  return await prisma.user.update({
    where: { id },
    data: userData,
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      updatedAt: true,
    },
  });
};

export const softDeleteUser = async (id) => {
  return await prisma.user.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};
