import { Work } from "../data/index.js";

import { AppError } from "../utils/errorApp.util.js";
import { catchAndLogError, createLogger } from "../utils/logger.util.js"

const logger = createLogger('WorkService');

export async function getAllWorks(filters = {}) {
  try {
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
  } catch (error) {
    catchAndLogError(logger, error, 'Error fetching works');
  }
}

export async function getWorkById(workId) {
  try {
    const work = await Work.findById(workId)
      .populate("chapters")
      .populate("comments");

    return work;
  } catch (error) {
    catchAndLogError(logger, error, 'Error fetching work by ID');
  }
}

export async function createWork(workData) {
  try {
    const work = await Work.create({
      ...workData,
      status: workData.status ?? "En emision",
      visits: workData.visits ?? 0,
      followers: workData.followers ?? 0,
      chapters: workData.chapters ?? [],
      comments: workData.comments ?? []
    });

    return work;
  } catch (error) {
    catchAndLogError(logger, error, 'Error creating work');
  }
}

export async function updateWorkById(workId, updateData) {
  try {
    const updatedWork = await Work.findByIdAndUpdate(workId, updateData, {
      new: true,
      runValidators: true
    });
    return updatedWork;
  } catch (error) {
    catchAndLogError(logger, error, 'Error updating work');
  }
}

export async function deleteWorkById(workId) {
  try {
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
  } catch (error) {
    catchAndLogError(logger, error, 'Error deleting work');
  }
}

export async function getWorkChapters(workId) {
  try {
    const work = await Work.findById(workId).populate("chapters");

    if (!work) {
      return null;
    }

    return work.chapters;
  } catch (error) {
    catchAndLogError(logger, error, 'Error fetching work chapters');
  }
}
