import * as FollowData from "../data/follow.data.js";
import { Work } from "../data/works.js";
import { AppError } from "../utils/errorApp.util.js";
import { createLogger, catchAndLogError } from "../utils/logger.util.js";

const logger = createLogger("FollowService");

export async function getFollowsByUserId(userId) {
  try {
    return await FollowData.getFollowsByUserId(userId);
  } catch (error) {
    catchAndLogError(logger, error, "Error fetching follows");
  }
}

export async function addFollow(userId, workId) {
  try {
    const work = await Work.findById(workId);

    if (!work) {
      throw new AppError("Work not found", 404);
    }

    const existingFollow = await FollowData.findFollow(userId, workId);

    if (existingFollow) {
      throw new AppError("Work is already being followed", 400);
    }

    const follow = await FollowData.createFollow(userId, workId);

    work.followers = (work.followers ?? 0) + 1;
    await work.save();

    logger.verbose("Follow added", { userId, workId });
    return follow;
  } catch (error) {
    catchAndLogError(logger, error, "Error adding follow");
  }
}

export async function removeFollow(userId, workId) {
  try {
    const existingFollow = await FollowData.findFollow(userId, workId);

    if (!existingFollow) {
      return null;
    }

    const deletedFollow = await FollowData.deleteFollow(userId, workId);

    const work = await Work.findById(workId);
    if (work && work.followers > 0) {
      work.followers -= 1;
      await work.save();
    }

    logger.verbose("Follow removed", { userId, workId });
    return deletedFollow;
  } catch (error) {
    catchAndLogError(logger, error, "Error removing follow");
  }
}
