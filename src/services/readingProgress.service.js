import * as ReadingProgressData from "../data/readingProgress.data.js";
import * as ChapterService from "./chapter.service.js";
import { Work } from "../data/works.js";
import { AppError } from "../utils/errorApp.util.js";
import { createLogger, catchAndLogError } from "../utils/logger.util.js";

const logger = createLogger("ReadingProgressService");

export async function getReadingProgressByUserId(userId) {
  try {
    return await ReadingProgressData.getReadingProgressByUserId(userId);
  } catch (error) {
    catchAndLogError(logger, error, "Error fetching reading progress");
  }
}

export async function createReadingProgress(userId, workId, chapterId) {
  try {
    const work = await Work.findById(workId);

    if (!work) {
      throw new AppError("Work not found", 404);
    }

    await ChapterService.validateChapterInWork(workId, chapterId);

    const existingProgress = await ReadingProgressData.findReadingProgress(userId, workId, chapterId);

    if (existingProgress) {
      throw new AppError("Reading progress already exists for this chapter", 400);
    }

    const progress = await ReadingProgressData.createReadingProgress(userId, workId, chapterId);
    logger.verbose("Reading progress created", { userId, workId, chapterId });
    return progress;
  } catch (error) {
    catchAndLogError(logger, error, "Error creating reading progress");
  }
}

export async function deleteReadingProgress(userId, workId, chapterId) {
  try {
    const existingProgress = await ReadingProgressData.findReadingProgress(userId, workId, chapterId);

    if (!existingProgress) {
      return null;
    }

    const deletedProgress = await ReadingProgressData.softDeleteReadingProgress(userId, workId, chapterId);
    logger.verbose("Reading progress deleted", { userId, workId, chapterId });
    return deletedProgress;
  } catch (error) {
    catchAndLogError(logger, error, "Error deleting reading progress");
  }
}
