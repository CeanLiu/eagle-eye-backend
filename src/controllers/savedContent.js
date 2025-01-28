import * as gService from "../utils/googleServices.js";
import "dotenv/config";
import { getFiles } from "../utils/files.js";
import path from "path";

export function uploadToDrive(req, res) {
  console.log(req.body);
  const files = req.body;
  let response;
  for (const key in files) {
    let filePath;
    const value = files[key];
    if (value === "video") {
      filePath = path.join(process.env.VIDEO_STORAGE_PATH, key);
    } else if (value === "image") {
      filePath = path.join(process.env.CAPTURE_STORAGE_PATH, key);
    }
    response = gService.uploadFile(filePath);
  }
  res.send(response);
}

export async function getMedia(req, res) {
  try {
    const videos = await getFiles(process.env.VIDEO_STORAGE_PATH);
    const images = await getFiles(process.env.CAPTURE_STORAGE_PATH);
    const responseBody = {
      videos: videos, // Array of video files
      images: images, // Array of image files
    };

    res.json(responseBody); // Send the response as JSON (no need to stringify manually)
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle any errors
  }
}
