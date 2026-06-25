import * as ReadingProgressData from "../data/readingProgress.data.js";
import { validateChapterInWork } from "./chapter.service.js";
import { Work } from "../data/works.js";
import { AppError } from "../utils/errorApp.util.js";

export async function getReadingProgressByUserId(userId) {
  const progressList = await ReadingProgressData.getReadingProgressByUserId(userId);
  return progressList;
}

export async function createReadingProgress(userId, workId, chapterId) {
  const work = await Work.findById(workId);

  if (!work) {
    throw new AppError("Work not found", 404);
  }

  await validateChapterInWork(workId, chapterId);

  const existingProgress = await ReadingProgressData.findReadingProgress(
    userId,
    workId,
    chapterId
  );

  if (existingProgress) {
    throw new AppError("Reading progress already exists for this chapter", 400);
  }

  const progress = await ReadingProgressData.createReadingProgress(
    userId,
    workId,
    chapterId
  );

  return progress;
}

export async function updateReadingProgress(userId, workId, chapterId) {
  const work = await Work.findById(workId);

  if (!work) {
    throw new AppError("Work not found", 404);
  }

  await validateChapterInWork(workId, chapterId);

  const progress = await ReadingProgressData.upsertReadingProgress(
    userId,
    workId,
    chapterId
  );

  return progress;
}
