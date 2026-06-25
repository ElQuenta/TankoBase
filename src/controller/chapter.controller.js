import * as ChapterService from "../services/chapter.service.js";

import { CreatedResponseHandler, SuccessResponseHandler, NoContentResponseHandler } from '../handlers/success.handler.js'
import { ErrorResponseHandler } from '../handlers/error.handler.js'

export const createChapter = async (req, res) => {
  try {
    const { workId, ...chapterData } = req.body;
    const newChapter = await ChapterService.createChapter(workId, chapterData);
    CreatedResponseHandler(res, newChapter);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};

export const getChapterById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user ? req.user.id : null;
    const chapter = await ChapterService.getChapterById(id, userId);
    SuccessResponseHandler(res, chapter);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
}

export const updateChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const type = req.query.type;
    const updatedChapter = await ChapterService.updateChapterById(id, updateData, type);
    SuccessResponseHandler(res, updatedChapter);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
}

export const deleteChapter = async (req, res) => {
  try {
    const { id } = req.params;
    await ChapterService.deleteChapterById(id);
    NoContentResponseHandler(res);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
}