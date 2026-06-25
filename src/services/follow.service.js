import * as FollowData from "../data/follow.data.js";
import { Work } from "../data/works.js";
import { AppError } from "../utils/errorApp.util.js";

export async function getFollowsByUserId(userId) {
  const follows = await FollowData.getFollowsByUserId(userId);
  return follows;
}

export async function addFollow(userId, workId) {
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

  return follow;
}

export async function removeFollow(userId, workId) {
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

  return deletedFollow;
}
