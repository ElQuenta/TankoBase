import crypto from "crypto";
import path from "path";

import { put } from "@vercel/blob";
import multer from "multer";

import { Work } from "../data/works.js";

import config from "../config/config.js";
import { ErrorResponseHandler } from "../handlers/error.handler.js";
import { AppError } from "../utils/errorApp.util.js";
import { createLogger } from "../utils/logger.util.js";

const logger = createLogger("UploadSingleMiddleware");

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new AppError("Only image files are allowed", 400));
      return;
    }

    cb(null, true);
  }
});

function createBlobId() {
  return crypto.randomUUID();
}

function getImageExtension(file) {
  const originalExtension = path.extname(file.originalname).replace(".", "");
  const mimeExtension = file.mimetype.split("/")[1];

  return (originalExtension || mimeExtension || "webp").toLowerCase();
}

function uploadCoverToBlob(fieldName = "cover", options = {}) {
  const { required = true } = options;

  return (req, res, next) => {
    upload.single(fieldName)(req, res, async (uploadError) => {
      try {
        if (uploadError) {
          throw uploadError;
        }

        if (!req.file) {
          if (!required) {
            next();
            return;
          }

          throw new AppError(
            `Image file is required in field "${fieldName}"`,
            400
          );
        }
        const existingWork = await Work.findOne({ where: { id: req.params.id } });
        const existingSeriesId = existingWork ? existingWork.vercelId : null;
        const seriesId = existingSeriesId || createBlobId();
        const extension = getImageExtension(req.file);
        const safeOriginalName = path
          .basename(req.file.originalname, path.extname(req.file.originalname))
          .replace(/[^a-zA-Z0-9_-]/g, "")
          .slice(0, 40);
        const fileName = `${safeOriginalName || "cover"}-${crypto.randomUUID()}.${extension}`;
        const blobPath = `comics/${seriesId}/covers/${fileName}`;

        const blob = await put(blobPath, req.file.buffer, {
          access: "public",
          contentType: req.file.mimetype,
          token: config.blob.readWriteToken
        });

        req.body.banner = blob.url;
        req.body.vercelId = seriesId;
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

function uploadOptionalCoverToBlob(fieldName = "cover") {
  return uploadCoverToBlob(fieldName, { required: false });
}

export const uploadSingleCover = uploadCoverToBlob;
export const uploadOptionalSingleCover = uploadOptionalCoverToBlob;
export default uploadCoverToBlob;
