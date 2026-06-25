import crypto from "crypto";
import path from "path";

import { put } from "@vercel/blob";
import multer from "multer";

import { Work } from "../data/works.js";
import { Chapter } from "../data/chapters.js";

import config from "../config/config.js";
import { ErrorResponseHandler } from "../handlers/error.handler.js";
import { AppError } from "../utils/errorApp.util.js";
import { createLogger } from "../utils/logger.util.js";

const logger = createLogger("Upload Middleware");

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new AppError("Only image files are allowed", 400));
      return;
    }

    cb(null, true);
  },
});

function createBlobId() {
  return crypto.randomUUID();
}

function getImageExtension(file) {
  const originalExtension = path.extname(file.originalname).replace(".", "");
  const mimeExtension = file.mimetype.split("/")[1];

  return (originalExtension || mimeExtension || "webp").toLowerCase();
}

function getChapterLabel(body) {
  return (
    body.chapterNumber ||
    body.number ||
    body.episodeNumber ||
    "1"
  );
}

function uploadChapterImagesToBlob({
  fieldName = "images",
  maxCount = 100,
  required = true,
} = {}) {
  return (req, res, next) => {
    upload.array(fieldName, maxCount)(req, res, async (uploadError) => {
      try {
        if (uploadError) {
          throw uploadError;
        }

        if (!req.files?.length) {
          if (required) {
            throw new AppError(
              `At least one image is required in field "${fieldName}"`,
              400
            );
          }

          return next();
        }

        // On PUT the chapterId comes from the route param (:id)
        const chapterParamId = req.params.id || req.params.chapterId || null;

        const chapter = chapterParamId
          ? await Chapter.findById(chapterParamId)
          : null;

        // workId can come from the body (POST) or be resolved from the chapter (PUT)
        const workId = req.body.workId
          || chapter?.workId?.toString()
          || (chapterParamId ? (await Work.findOne({ chapters: chapterParamId }))?._id?.toString() : null);

        const work = await Work.findById(workId);

        if (!work) {
          throw new AppError("Work not found", 404);
        }

        const seriesId = work.vercelId || createBlobId();
        const chapterId = chapter?.vercelId || createBlobId();
        const chapterLabel = getChapterLabel(req.body);

        const filesInOrder = [...req.files].reverse();

        const uploadedImages = await Promise.all(
          filesInOrder.map(async (file, index) => {
            const pageNumber = String(index + 1).padStart(2, "0");
            const extension = getImageExtension(file);

            const blobPath = `comics/${seriesId}/${chapterId}/${chapterLabel}_${pageNumber}.${extension}`;

            const blob = await put(blobPath, file.buffer, {
              access: "public",
              contentType: file.mimetype,
              token: config.blob.readWriteToken,
            });

            return {
              order: index + 1,
              path: blobPath,
              url: blob.url,
            };
          })
        );

        req.body.vercelId = chapterId;
        req.body.images = uploadedImages.map((image) => image.url);

        next();
      } catch (error) {
        if (!(error instanceof AppError)) {
          logger.error("Error uploading cover to blob", {
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined
          });
        }
        ErrorResponseHandler(res, error);
      }
    });
  };
}

export const uploadChapterImages = uploadChapterImagesToBlob({
  required: true,
});

export const uploadChapterImagesOptional = uploadChapterImagesToBlob({
  required: false,
});

export default uploadChapterImagesToBlob;