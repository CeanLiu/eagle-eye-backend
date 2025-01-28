import * as gService from "../utils/googleServices.js";
import { getFiles } from "../utils/files.js";

export function uploadToDrive(req, res) {
  const request = JSON.parse(req);
  console.log(request);
}

export async function getMedia(req, res) {
  try {
    const videos = await getFiles(process.env.VIDEO_STORAGE_PATH);
    const images = await getFiles(process.env.CAPTURE_STORAGE_PATH);
    // Prepend the base URL to the filenames
    const videoUrls = videos.map(
      (video) => `http://localhost:80/savedContent/videos/${video}`
    );
    const imageUrls = images.map(
      (image) => `http://localhost:80/savedContent/images/${image}`
    );
    const responseBody = {
      videos: videoUrls, // Array of video files
      images: imageUrls, // Array of image files
    };

    res.json(responseBody); // Send the response as JSON (no need to stringify manually)
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle any errors
  }
}
