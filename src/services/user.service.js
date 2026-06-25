import bcrypt from 'bcryptjs';

import * as UserData from '../data/user.data.js';
import * as AuthData from '../data/auth.data.js';

import { AppError } from '../utils/errorApp.util.js';
import { createLogger, catchAndLogError } from '../utils/logger.util.js';

const logger = createLogger('UserService');

export const getAllUsers = async () => {
  try {
    return await UserData.getAllUsers();
  } catch (error) {
    catchAndLogError(logger, error, 'Error fetching users');
  }
};

export const getUserById = async (id) => {
  try {
    const user = await UserData.getUserById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  } catch (error) {
    catchAndLogError(logger, error, 'Error fetching user');
  }
};

export const createUser = async (userData) => {
  try {
    const existingEmail = await AuthData.getUserByEmail(userData.email);
    if (existingEmail) {
      throw new AppError('Email already in use', 400);
    }

    const existingUsername = await AuthData.getUserByUsername(userData.username);
    if (existingUsername) {
      throw new AppError('Username already in use', 400);
    }

    const password = await bcrypt.hash(userData.password, 10);
    const newUser = await UserData.createUser({ ...userData, password });

    logger.verbose('User created by admin', { userId: newUser.id });
    return newUser;
  } catch (error) {
    catchAndLogError(logger, error, 'Error creating user');
  }
};

export const updateUser = async (id, userData) => {
  try {
    const existing = await UserData.getUserById(id);
    if (!existing) {
      throw new AppError('User not found', 404);
    }

    if (userData.email && userData.email !== existing.email) {
      const emailTaken = await AuthData.getUserByEmail(userData.email);
      if (emailTaken) {
        throw new AppError('Email already in use', 400);
      }
    }

    if (userData.username && userData.username !== existing.username) {
      const usernameTaken = await AuthData.getUserByUsername(userData.username);
      if (usernameTaken) {
        throw new AppError('Username already in use', 400);
      }
    }

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const updatedUser = await UserData.updateUser(id, userData);
    logger.verbose('User updated by admin', { userId: id });
    return updatedUser;
  } catch (error) {
    catchAndLogError(logger, error, 'Error updating user');
  }
};

export const deleteUser = async (id) => {
  try {
    const existing = await UserData.getUserById(id);
    if (!existing) {
      throw new AppError('User not found', 404);
    }

    await UserData.softDeleteUser(id);
    logger.verbose('User deleted by admin', { userId: id });
  } catch (error) {
    catchAndLogError(logger, error, 'Error deleting user');
  }
};
