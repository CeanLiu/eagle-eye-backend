import "dotenv/config";
import express from "express";
import fs from "fs";

const router = express.Router();
// Assuming VIDEO_STORAGE_PATH is set in your environment file
router.use("/", express.static(process.env.VIDEO_STORAGE_PATH));

// Define a route to list the video files
router.get("/", (req, res) => {
  // Read the video directory to get all the files
  fs.readdir(process.env.VIDEO_STORAGE_PATH, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to retrieve videos" });
    }

    // Filter and create links for video files
    const videoLinks = files
      .filter((file) =>
        file.match(/\.(mp4|mov|wmv|avi|mkv|flv|f4v|swf|mts|m2ts|webm)$/i)
      )
      .map(
        (file) =>
          `<li><a href="/videos/${file}" target="_blank">${file}</a></li>`
      )
      .join("");

    // Create an HTML page listing the videos
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Uploaded Videos</title>
      </head>
      <body>
        <h1>Uploaded Videos</h1>
        <ul>
          ${videoLinks || "<li>No videos uploaded yet</li>"}
        </ul>
      </body>
      </html>
    `;

    // Send the list of videos to the client
    res.send(html);
  });
});

export default router;
