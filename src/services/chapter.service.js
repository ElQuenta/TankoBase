import { Chapter } from "../data/chapters.js";
import { Work } from "../data/works.js";
import { AppError } from "../utils/errorApp.util.js";

async function findWorkByChapterId(chapterId) {
  return Work.findOne({ chapters: chapterId });
}

async function chapterBelongsToWork(workId, chapterId) {
  const work = await Work.findById(workId);

  if (!work) {
    return false;
  }

  return work.chapters.some((id) => id.toString() === chapterId.toString());
}

export async function getChapterById(chapterId) {
  const chapter = await Chapter.findById(chapterId).populate("comments");
  return chapter;
}

export async function createChapter(workId, chapterData) {
  const work = await Work.findById(workId);

  if (!work) {
    throw new AppError("Work not found", 404);
  }

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
    number: chapterData.number,
    publishedAt: chapterData.publishedAt ?? new Date(),
    status,
    images: chapterData.images ?? [],
    comments: []
  });

  work.chapters.push(chapter._id);
  await work.save();

  return chapter;
}

export async function updateChapterById(chapterId, updateData) {
  const chapter = await Chapter.findById(chapterId);

  if (!chapter) {
    return null;
  }

  const nextStatus = updateData.status ?? chapter.status;
  const nextImages =
    updateData.images !== undefined ? updateData.images : chapter.images;

  if (
    nextStatus === "Publicado" &&
    (!Array.isArray(nextImages) || nextImages.length === 0)
  ) {
    throw new AppError("Published chapter must have at least one image", 400);
  }

  if (updateData.number !== undefined) {
    const work = await findWorkByChapterId(chapterId);

    if (work) {
      const chapterIds = work.chapters.filter(
        (id) => id.toString() !== chapterId.toString()
      );

      const duplicateNumber = await Chapter.findOne({
        _id: { $in: chapterIds },
        number: updateData.number
      });

      if (duplicateNumber) {
        throw new AppError("Chapter number already exists for this work", 400);
      }
    }
  }

  const updatedChapter = await Chapter.findByIdAndUpdate(chapterId, updateData, {
    new: true,
    runValidators: true
  });

  return updatedChapter;
}

export async function deleteChapterById(chapterId) {
  const chapter = await Chapter.findById(chapterId);

  if (!chapter) {
    return null;
  }

  await Work.updateMany(
    { chapters: chapterId },
    { $pull: { chapters: chapterId } }
  );

  const deletedChapter = await Chapter.findByIdAndDelete(chapterId);
  return deletedChapter;
}

export async function validateChapterInWork(workId, chapterId) {
  const belongs = await chapterBelongsToWork(workId, chapterId);

  if (!belongs) {
    throw new AppError("Chapter does not belong to this work", 400);
  }

  const chapter = await Chapter.findById(chapterId);

  if (!chapter) {
    throw new AppError("Chapter not found", 404);
  }

  return chapter;
}
