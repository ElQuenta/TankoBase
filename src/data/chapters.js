import mongoose from "mongoose";
import { CHAPTER_STATUS } from "../utils/work.constants.js";

const chapterSchema = new mongoose.Schema({
  number: Number,
  workId: { type: mongoose.Schema.Types.ObjectId, ref: "Work" },
  publishedAt: { type: Date, default: Date.now },
  vercelId: String,
  status: { type: String, enum: CHAPTER_STATUS },
  images: [String],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

export const Chapter = mongoose.model("Chapter", chapterSchema, "chapters");
