import { Comment } from "../data/comments.js";
import { Work } from "../data/works.js";
import { Chapter } from "../data/chapters.js";
import { AppError } from "../utils/errorApp.util.js";

export async function getCommentsByWorkId(workId) {
  const work = await Work.findById(workId).populate({
    path: "comments",
    populate: { path: "comments" }
  });

  if (!work) {
    return null;
  }

  return work.comments;
}

export async function getCommentsByChapterId(chapterId) {
  const chapter = await Chapter.findById(chapterId).populate({
    path: "comments",
    populate: { path: "comments" }
  });

  if (!chapter) {
    return null;
  }

  return chapter.comments;
}

export async function createComment({ userId, content, workId, chapterId, parentCommentId }) {
  if (!workId && !chapterId && !parentCommentId) {
    throw new AppError("Comment must be linked to a work, chapter or parent comment", 400);
  }

  const comment = await Comment.create({
    userId,
    content,
    publishedAt: new Date(),
    comments: []
  });

  if (workId) {
    const work = await Work.findById(workId);

    if (!work) {
      throw new AppError("Work not found", 404);
    }

    work.comments.push(comment._id);
    await work.save();
  }

  if (chapterId) {
    const chapter = await Chapter.findById(chapterId);

    if (!chapter) {
      throw new AppError("Chapter not found", 404);
    }

    chapter.comments.push(comment._id);
    await chapter.save();
  }

  if (parentCommentId) {
    const parentComment = await Comment.findById(parentCommentId);

    if (!parentComment) {
      throw new AppError("Parent comment not found", 404);
    }

    parentComment.comments.push(comment._id);
    await parentComment.save();
  }

  return comment;
}

export async function updateCommentById(commentId, userId, content, userRole) {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    return null;
  }

  const isOwner = comment.userId === userId;
  const isModerator = userRole === "ADMINISTRATOR" || userRole === "EDITOR";

  if (!isOwner && !isModerator) {
    throw new AppError("You can only edit your own comments", 403);
  }

  comment.content = content;
  await comment.save();

  return comment;
}

export async function deleteCommentById(commentId, userId, userRole) {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    return null;
  }

  const isOwner = comment.userId === userId;
  const isModerator = userRole === "ADMINISTRATOR" || userRole === "EDITOR";

  if (!isOwner && !isModerator) {
    throw new AppError("You can only delete your own comments", 403);
  }

  await Work.updateMany({ comments: commentId }, { $pull: { comments: commentId } });
  await Chapter.updateMany({ comments: commentId }, { $pull: { comments: commentId } });
  await Comment.updateMany({ comments: commentId }, { $pull: { comments: commentId } });

  const deletedComment = await Comment.findByIdAndDelete(commentId);
  return deletedComment;
}
