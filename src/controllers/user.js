import { processVideo, resetFC } from "../utils/files.js";
export let isRecording = false;
export let wasRecording = false;
export let capture = false;
export function handleMessage(client, message) {
  if (message.type === "record") {
    wasRecording = isRecording;
    isRecording = message.value === "on";
  } else if (message.type === "capture") {
    capture = true;
    console.log(capture);
    setTimeout(resetCapture, 1000);
  }
}
export function resetIsRecording() {
  isRecording = false;
  wasRecording = false;
}

export function resetCapture() {
  capture = false;
}
