import express from "express";
import "dotenv/config";
import fileUpload from "express-fileupload";
import { stat } from "fs";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { filesExists, fileExtLimiter } from "../utils/middleware.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../index.html"));
});

router.post(
  "/uploads",
  fileUpload({ createParentPath: true }),
  filesExists,
  fileExtLimiter([
    ".mp4",
    ".mov",
    ".wmv",
    ".avi",
    ".mkv",
    ".flv",
    ".f4v",
    ".swf",
    ".mts",
    ".m2ts",
    ".webm",
  ]),
  (req, res) => {
    const files = req.files;
    console.log(files);

    Object.keys(files).forEach((key) => {
      const filepath = path.join(
        process.env.VIDEO_STORAGE_PATH,
        files[key].name
      );
      files[key].mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: "error", message: err });
      });
    });
    return res.json({
      status: "success",
      message: Object.keys(files).toString(),
    });
  }
);

export default router;
