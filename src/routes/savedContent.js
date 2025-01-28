import express from "express";
import * as savedController from "../controllers/savedContent.js";
import { filesExists, fileExtLimiter } from "../utils/middleware.js";
import fileUpload from "express-fileupload";
const router = express.Router();

router.use("/videos", express.static(process.env.VIDEO_STORAGE_PATH));

router.use("/images", express.static(process.env.CAPTURE_STORAGE_PATH));

router.post(
  "/upload",
  fileUpload({ createParentPath: true }),
  savedController.uploadToDrive
);

router.get("/media", savedController.getMedia);

export default router;
