import "dotenv/config";
import {
  wasRecording,
  isRecording,
  resetIsRecording,
  capture,
  resetCapture,
} from "./user.js";
import * as fileUtils from "../utils/files.js";

export async function handleImage(clients, image) {
  for (const client of clients) {
    if (client.getType() === "user") {
      client.sendMessage(image);
    }
  }

  //handle recording(process frames and download to local)
  if (isRecording && !wasRecording) {
    await fileUtils.saveFrame(process.env.TEMP_FRAME_PATH, image, false);
  } else if (!isRecording && wasRecording) {
    resetIsRecording();
    fileUtils.resetFC();
    await fileUtils.processVideo(
      process.env.TEMP_FRAME_PATH,
      process.env.VIDEO_STORAGE_PATH
    );
    await fileUtils.deleteDir(inputDir);
    await fileUtils.makeDir(inputDir);
  }

  //capture frame and download to local
  if (capture) {
    await fileUtils.saveFrame(process.env.CAPTURE_SORAGE_PATH, image, true);
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
