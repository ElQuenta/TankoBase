import * as FollowService from '../services/follow.service.js';

import { CreatedResponseHandler, SuccessResponseHandler, NoContentResponseHandler } from '../handlers/success.handler.js';
import { ErrorResponseHandler } from '../handlers/error.handler.js';

export const getFollows = async (req, res) => {
  try {
    const userId = req.user.id;
    const follows = await FollowService.getFollowsByUserId(userId);
    SuccessResponseHandler(res, follows);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};

export const addFollow = async (req, res) => {
  try {
    const userId = req.user.id;
    const { workId } = req.params;
    const follow = await FollowService.addFollow(userId, workId);
    CreatedResponseHandler(res, follow);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};

export const removeFollow = async (req, res) => {
  try {
    const userId = req.user.id;
    const { workId } = req.params;
    await FollowService.removeFollow(userId, workId);
    NoContentResponseHandler(res);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};
