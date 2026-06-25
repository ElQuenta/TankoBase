import * as CommentService from '../services/comment.service.js';

import { CreatedResponseHandler, SuccessResponseHandler, NoContentResponseHandler } from '../handlers/success.handler.js';
import { ErrorResponseHandler } from '../handlers/error.handler.js';

export const getCommentsByWork = async (req, res) => {
  try {
    const { workId } = req.params;
    const comments = await CommentService.getCommentsByWorkId(workId);
    SuccessResponseHandler(res, comments);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};

export const getCommentsByChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const comments = await CommentService.getCommentsByChapterId(chapterId);
    SuccessResponseHandler(res, comments);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};

export const createComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const commentData = { ...req.body, userId };
    const newComment = await CommentService.createComment(commentData);
    CreatedResponseHandler(res, newComment);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;
    const { content } = req.body;
    const updatedComment = await CommentService.updateCommentById(id, userId, content, userRole);
    SuccessResponseHandler(res, updatedComment);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;
    await CommentService.deleteCommentById(id, userId, userRole);
    NoContentResponseHandler(res);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};
