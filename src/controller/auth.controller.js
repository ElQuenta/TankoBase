import * as AuthService from '../services/auth.service.js';

import { CreatedResponseHandler, SuccessResponseHandler } from '../handlers/success.handler.js'
import { ErrorResponseHandler } from '../handlers/error.handler.js'

export const register = async (req, res) => {
  try {
    const userData = req.body;
    const authResponse = await AuthService.registerUser(userData);
    CreatedResponseHandler(res, authResponse);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const authResponse = await AuthService.loginUser(email, password);
    SuccessResponseHandler(res, authResponse);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};