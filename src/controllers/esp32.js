import { wasRecording, isRecording, resetIsRecording } from "./user.js";
import * as fileUtils from "../utils/files.js";
import path from "path";
let videoStream;
export async function handleImage(clients, image) {
  for (const client of clients) {
    if (client.getType() === "user") {
      client.sendMessage(image);
    }
  }

  if (isRecording && !wasRecording) {
    fileUtils.saveFrame(image);
  } else if (!isRecording && wasRecording) {
    resetIsRecording();
    const outputDir = "public/assets/videos";
    const inputDir = "public/assets/temp";
    fileUtils.resetFC();
    await fileUtils.processVideo(inputDir, outputDir);
    await fileUtils.deleteDir(inputDir);
    await fileUtils.makeDir(inputDir);
  }
}

export function handleMessage(clients, message) {
  for (const client of clients) {
    if (clients.getType() === "user") {
      client.sendMessage(message);
    }
  }
}
