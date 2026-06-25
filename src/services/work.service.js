import { Work } from "../data/works.js";
import { AppError } from "../utils/errorApp.util.js";

export async function getAllWorks(filters = {}) {
  const query = {};

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.type) {
    query.type = filters.type;
  }

  if (filters.genre) {
    query.genres = filters.genre;
  }

  if (filters.title) {
    query.title = { $regex: filters.title, $options: "i" };
  }

  const works = await Work.find(query).populate("chapters");
  return works;
}

export async function getWorkById(workId) {
  const work = await Work.findById(workId)
    .populate("chapters")
    .populate("comments");

  return work;
}

export async function createWork(workData) {
  const work = await Work.create({
    title: workData.title,
    synopsis: workData.synopsis,
    banner: workData.banner,
    type: workData.type,
    status: workData.status ?? "En emision",
    visits: workData.visits ?? 0,
    followers: workData.followers ?? 0,
    genres: workData.genres,
    chapters: workData.chapters ?? [],
    comments: workData.comments ?? []
  });

  return work;
}

export async function updateWorkById(workId, updateData) {
  const updatedWork = await Work.findByIdAndUpdate(workId, updateData, {
    new: true,
    runValidators: true
  });

  return updatedWork;
}

export async function deleteWorkById(workId) {
  const work = await Work.findById(workId);

  if (!work) {
    return null;
  }

  if (work.chapters.length > 0) {
    throw new AppError(
      "Cannot delete a work that has associated chapters",
      400
    );
  }

  const deletedWork = await Work.findByIdAndDelete(workId);
  return deletedWork;
}

export async function getWorkChapters(workId) {
  const work = await Work.findById(workId).populate("chapters");

  if (!work) {
    return null;
  }

  return work.chapters;
}
