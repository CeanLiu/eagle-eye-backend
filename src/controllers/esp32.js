import {
  wasRecording,
  isRecording,
  resetIsRecording,
  capture,
  resetCapture,
  isLightOn,
} from "./user.js";
import * as fileUtils from "../utils/files.js";
import path from "path";

export async function handleImage(clients, image) {
  for (const client of clients) {
    if (client.getType() === "user") {
      client.sendMessage(image);
    }
  }

  //handle recording(process frames and download to local)
  if (isRecording && !wasRecording) {
    const outputDir = "public/assets/temp";
    await fileUtils.saveFrame(outputDir, image, false);
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
    await fileUtils.saveFrame(outputDir, image, true);
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

export function sendMessage() {}
