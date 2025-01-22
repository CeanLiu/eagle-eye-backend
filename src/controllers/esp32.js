import * as fs from "fs/promises";
import path from "path";

export async function streamEsp32(req, res) {
  try {
    // Create a promise to handle the data streaming
    console.log(req.body);
    const dataPromise = new Promise((resolve, reject) => {
      let imageData = Buffer.alloc(0);

      req.on("data", (chunk) => {
        imageData = Buffer.concat([imageData, chunk]);
        console.log("Received chunk of size:", chunk.length);
      });

      req.on("end", async () => {
        console.log("Final image size:", imageData.length, "bytes");

        // Optional: Save the image to verify it's being received correctly
        try {
          const timestamp = Date.now();
          const filename = `frame_${timestamp}.jpg`;
          const savePath = path.join(
            process.cwd(),
            "public/assets/photos",
            filename
          );
          await fs.writeFile(savePath, imageData);
          console.log("Saved image to:", savePath);
        } catch (err) {
          console.error("Failed to save image:", err);
        }

        resolve(imageData);
      });

      req.on("error", (err) => {
        console.error("Error receiving data:", err);
        reject(err);
      });
    });

    // Wait for the image data to be fully received
    const imageBuffer = await dataPromise;

    res.status(200).json({
      success: true,
      message: "Image received successfully",
      size: imageBuffer.length,
    });
  } catch (error) {
    console.error("Stream processing error:", error);
    res.status(500).json({ error: error.message });
  }
}
