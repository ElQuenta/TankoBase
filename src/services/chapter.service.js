import { Chapter } from "../data/chapters.js";
import { Work } from "../data/works.js";

import * as ReadingService from "./readingProgress.service.js";

import { AppError } from "../utils/errorApp.util.js";
import { createLogger, catchAndLogError } from "../utils/logger.util.js";

const logger = createLogger("Chapter Service");

export async function getChapterById(chapterId, userId) {
  try {
    const chapter = await getChapter(chapterId);
    if (userId) {
      const readingProgress = await ReadingService.getReadingProgressByUserId(userId)
      if (readingProgress && !readingProgress.some(rp => rp.episodeId === chapterId)) {
        await ReadingService.createReadingProgress(userId, chapterId);
      }
    }
    return chapter;
  } catch (error) {
    catchAndLogError(logger, error, "Error retrieving chapter by ID");
  }
}

export async function createChapter(workId, chapterData) {
  const work = await getWork(workId);

  if (chapterData.number === undefined || chapterData.number === null) {
    throw new AppError("Chapter number is required", 400);
  }

  const status = chapterData.status ?? "Borrador";

  if (
    status === "Publicado" &&
    (!Array.isArray(chapterData.images) || chapterData.images.length === 0)
  ) {
    throw new AppError("Published chapter must have at least one image", 400);
  }

  const duplicateNumber = await Chapter.findOne({
    _id: { $in: work.chapters },
    number: chapterData.number
  });

  if (duplicateNumber) {
    throw new AppError("Chapter number already exists for this work", 400);
  }

  const chapter = await Chapter.create({
    ...chapterData,
    workId,
    images: chapterData.images ?? [],
    comments: []
  });

  work.chapters.push(chapter._id);
  await work.save();

  return chapter;
}

export async function updateChapterById(chapterId, updateData, type) {
  try {
    const chapter = await getChapter(chapterId);
    logger.debug(`Updating chapter ${chapterId} with data:`, {data: updateData, type: type});
    const nextStatus = updateData.status ?? chapter.status;
    let nextImages = null;
    if (type === "APPEND" && Array.isArray(updateData.images)) {
      nextImages = [...chapter.images, ...updateData.images];
    } else if (type === "REPOST" && Array.isArray(updateData.images)) {
      nextImages = updateData.images;
    } else {
      nextImages = chapter.images;
    }

    if (
      nextStatus === "Publicado" &&
      (!Array.isArray(nextImages) || nextImages.length === 0)
    ) {
      throw new AppError("Published chapter must have at least one image", 400);
    }

    const updatedChapter = await Chapter.findByIdAndUpdate(chapterId, { ...updateData, images: nextImages }, {
      new: true,
      runValidators: true
    });

    return updatedChapter;
  } catch (error) {
    catchAndLogError(logger, error, "Error updating chapter by ID");
  }
}

export async function deleteChapterById(chapterId) {
  try {
    const chapter = await getChapter(chapterId);

    await Work.updateMany(
      { chapters: chapterId },
      { $pull: { chapters: chapterId } }
    );

    const deletedChapter = await Chapter.findByIdAndDelete(chapterId);
    return deletedChapter;
  } catch (error) {
    catchAndLogError(logger, error, "Error deleting chapter by ID");
  }
}

export const validateChapterInWork = async (workId, chapterId) => {
  const work = await getWork(workId);
  await getChapter(chapterId);
  const chapterExistsInWork = work.chapters.some(
    (chapter) => chapter.toString() === chapterId
  );
  return chapterExistsInWork;
};

async function getWork(workId) {
  const work = await Work.findById(workId);
  if (!work) {
    throw new AppError("Work not found", 404);
  }
  return work;
}

async function getChapter(chapterId) {
  const chapter = await Chapter.findById(chapterId).populate("comments");
  if (!chapter) {
    throw new AppError("Chapter not found", 404);
  }
  return chapter;
}