import { processVideo, resetFC } from "../utils/files.js";
export let isRecording = false;
export let wasRecording = false;
export function handleMessage(client, message) {
  if (message.type === "record") {
    wasRecording = isRecording;
    isRecording = message.value === "on";
  }
}
export function resetIsRecording() {
  isRecording = false;
  wasRecording = false;
}
