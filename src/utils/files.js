import * as fs from "fs/promises";
import { rmSync, mkdirSync } from "fs";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import path from "path";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

let frameCounter = 1;
export async function saveFrame(imageData) {
  try {
    const filename = `frame_${frameCounter}.jpg`;
    const savePath = path.join(process.cwd(), "public/assets/temp", filename);
    await fs.writeFile(savePath, imageData);
    console.log("Saved image to:", savePath);
    frameCounter += 1;
  } catch (err) {
    console.error("Failed to save image:", err);
  }
}

export function resetFC() {
  frameCounter = 1;
}

export async function processVideo(inputDir, outputDir) {
  await new Promise((resolve, reject) => {
    // Define the output video path
    const outputPath = path.join(outputDir, `video_${Date.now()}.mp4`);

    // FFmpeg command to convert the image sequence to a video
    ffmpeg()
      .addInput(path.join(inputDir, "frame_%d.jpg")) // Input image sequence
      .inputOptions("-framerate 10") // Set frame rate to 30 (or adjust as needed)
      .videoCodec("libx264") // Use libx264 codec
      .save(outputPath) // Output video path
      .on("start", (commandLine) => {
        console.log("FFmpeg command:", commandLine);
      })
      .on("end", () => {
        console.log("Video processing complete");
        resolve(outputPath); // Resolve with the output video path
      })
      .on("error", (err) => {
        console.error("Error during video processing:", err);
        reject(err); // Reject with the error
      })
      .run(); // Run the FFmpeg process
  });
}

export async function deleteDir(dir) {
  rmSync(dir, { recursive: true, force: true });
}
export async function makeDir(dir) {
  mkdirSync(dir);
}
