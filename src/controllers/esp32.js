import {
  wasRecording,
  isRecording,
  resetIsRecording,
  capture,
  resetCapture,
} from "./user.js";
import * as fileUtils from "../utils/files.js";
import path from "path";
let videoStream;
export async function handleImage(clients, image) {
  for (const client of clients) {
    if (client.getType() === "user") {
      client.sendMessage(image);
    }
  }

  //handle recording(process frames and download to local)
  if (isRecording && !wasRecording) {
    const inputDir = "public/assets/temp";
    await fileUtils.saveFrame(inputDir, image);
  } else if (!isRecording && wasRecording) {
    resetIsRecording();
    const outputDir = "public/assets/videos";
    const inputDir = "public/assets/temp";
    fileUtils.resetFC();
    await fileUtils.processVideo(inputDir, outputDir);
    await fileUtils.deleteDir(inputDir);
    await fileUtils.makeDir(inputDir);
  }

  //capture frame and download to local
  if (capture) {
    const outputDir = "public/assets/photos";
    await fileUtils.saveFrame(outputDir, image);
    resetCapture();
  }
}

export function handleMessage(clients, message) {
  for (const client of clients) {
    if (clients.getType() === "user") {
      client.sendMessage(message);
    }
  }
}
