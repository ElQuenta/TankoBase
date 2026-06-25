import mongoose from "mongoose";

const CHAPTER_STATUS = ["Publicado", "Borrador", "Programado", "Oculto"];

const chapterSchema = new mongoose.Schema({
  number: Number,
  publishedAt: Date,
  status: { type: String, enum: CHAPTER_STATUS },
  images: [String],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

export const Chapter = mongoose.model("Chapter", chapterSchema, "chapters");
