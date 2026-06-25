import mongoose from "mongoose";
import { WORK_STATUS, WORK_TYPES } from "../utils/work.constants.js";

const workSchema = new mongoose.Schema({
  title: String,
  synopsis: String,
  banner: String,
  type: { type: String, enum: WORK_TYPES },
  status: { type: String, enum: WORK_STATUS },
  visits: Number,
  followers: Number,
  genres: [String],
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

export const Work = mongoose.model("Work", workSchema, "works");
