import * as ReadingProgressService from '../services/readingProgress.service.js';

import { CreatedResponseHandler, SuccessResponseHandler, NoContentResponseHandler } from '../handlers/success.handler.js';
import { ErrorResponseHandler } from '../handlers/error.handler.js';

export const getReadingProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const progress = await ReadingProgressService.getReadingProgressByUserId(userId);
    SuccessResponseHandler(res, progress);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};

export const createReadingProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { workId, chapterId } = req.body;
    const progress = await ReadingProgressService.createReadingProgress(userId, workId, chapterId);
    CreatedResponseHandler(res, progress);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};

export const deleteReadingProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { workId, chapterId } = req.params;
    await ReadingProgressService.deleteReadingProgress(userId, workId, chapterId);
    NoContentResponseHandler(res);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};
