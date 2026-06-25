import mongoose from "mongoose";

const WORK_STATUS = ["En emision", "Finalizado", "Pausado", "Cancelado"];

const workSchema = new mongoose.Schema({
  title: String,
  synopsis: String,
  banner: String,
  status: { type: String, enum: WORK_STATUS },
  visits: Number,
  followers: Number,
  genres: [String],
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

export const Work = mongoose.model("Work", workSchema, "works");
