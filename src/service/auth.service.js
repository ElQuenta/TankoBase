import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import * as AuthData from '../data/auth.data.js';

import { createLogger, catchAndLogError } from '../utils/logger.util.js';
import { AppError } from '../utils/errorApp.util.js';
import config  from '../config/config.js';

const logger = createLogger('AuthService');

const converToAuthResponse = (user, token) => {
  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const registerUser = async (userData) => {
  try {
    const existingUserByEmail = await AuthData.getUserByEmail(userData.email);
    if (existingUserByEmail) {
      throw new AppError('Email already in use', 400);
    }
    const existingUserByUsername = await AuthData.getUserByUsername(userData.username);
    if (existingUserByUsername) {
      throw new AppError('Username already in use', 400);
    }
    const password = await bcrypt.hash(userData.password, 10);
    const newUser = await AuthData.createUser({ ...userData, password });
    logger.verbose('User registered successfully', { userId: newUser.id });
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, config.server.jwtSecret);
    return converToAuthResponse(newUser, token);
  } catch (error) {
    catchAndLogError(logger, error, 'Error registering user');
  }
};

export const loginUser = async (email, password) => {
  try {
    const user = await AuthData.getUserByEmail(email);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid credentials', 401);
    }
    const token = jwt.sign({ id: user.id, role: user.role }, config.server.jwtSecret);
    logger.verbose('User logged in successfully', { userId: user.id });
    return converToAuthResponse(user, token);
  } catch (error) {
    catchAndLogError(logger, error, 'Error logging in user');
  }
};