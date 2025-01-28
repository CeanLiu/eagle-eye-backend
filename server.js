import "dotenv/config";
import express from "express";
import setupWebSocket from "./src/ws/setupWebSocket.js";
import { createServer } from "http";
import { errorHandler } from "./src/utils/middleware.js";
import cors from "cors";
import uploadRouter from "./src/routes/upload.js";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const videosDir = path.join(__dirname, "videos");

const app = express();

app.use("/esp32", esp32Router);

app.use("/videos", express.static(videosDir));

app.get("/videos", (req, res) => {
  fs.readdir(videosDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to retrieve videos" });
    }

    // Create a basic HTML response with links to video files
    const videoLinks = files
      .filter((file) =>
        file.match(/\.(mp4|mov|wmv|avi|mkv|flv|f4v|swf|mts|m2ts|webm)$/i)
      )
      .map(
        (file) =>
          `<li><a href="/videos/${file}" target="_blank">${file}</a></li>`
      )
      .join("");

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

    res.send(html);
  });
});

app.use("/uploads", uploadRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Create an HTTP server using Express
const server = createServer(app);

setupWebSocket(server);

// Start the server
server.listen(process.env.PORT, process.env.PUBLIC_IP, () => {
  console.log(
    `Server running on http://${process.env.PUBLIC_IP}:${process.env.PORT}`
  );
});

// Example route for handling GET requests
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Express server!" });
});

// Error handling middleware
app.use(errorHandler);
