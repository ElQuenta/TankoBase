import * as UserService from '../services/user.service.js';

import { CreatedResponseHandler, SuccessResponseHandler, NoContentResponseHandler } from '../handlers/success.handler.js';
import { ErrorResponseHandler } from '../handlers/error.handler.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    SuccessResponseHandler(res, users);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);
    SuccessResponseHandler(res, user);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await UserService.createUser(req.body);
    CreatedResponseHandler(res, newUser);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await UserService.updateUser(id, req.body);
    SuccessResponseHandler(res, updatedUser);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await UserService.deleteUser(id);
    NoContentResponseHandler(res);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};
