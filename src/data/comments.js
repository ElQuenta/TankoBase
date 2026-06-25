import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: String,
  content: String,
  publishedAt: Date,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

export const Comment = mongoose.model("Comment", commentSchema, "comments");
