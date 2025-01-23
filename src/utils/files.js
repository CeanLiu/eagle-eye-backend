import * as fs from "fs/promises";
export async function saveImageFrame(imageData) {
  try {
    const timestamp = Date.now();
    const filename = `frame_${timestamp}.jpg`;
    const savePath = path.join(process.cwd(), "public/assets/photos", filename);
    await fs.writeFile(savePath, imageData);
    console.log("Saved image to:", savePath);
  } catch (err) {
    console.error("Failed to save image:", err);
  }
}
