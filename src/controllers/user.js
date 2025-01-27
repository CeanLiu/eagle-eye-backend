import { processVideo, resetFC } from "../utils/files.js";
export let isRecording = false;
export let wasRecording = false;
export let capture = false;
export let isLightOn = false;

export function handleMessage(clients, message) {
  if (message.type === "record") {
    wasRecording = isRecording;
    isRecording = message.value === "on";
  } else if (message.type === "capture") {
    capture = true;
    console.log(capture);
    setTimeout(resetCapture, 1000);
  } else if (message.type === "light") {
    isLightOn = message.value === "on";
    for (const client of clients) {
      if (client.getType() === "esp32") {
        client.sendMessage(isLightOn ? "lighton" : "lightoff");
      }
    }
  }
}
export function resetIsRecording() {
  isRecording = false;
  wasRecording = false;
}

export function resetCapture() {
  capture = false;
}
