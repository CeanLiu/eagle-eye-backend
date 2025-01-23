import * as esp32Utils from "../utils/esp32.js";

class FrameBuffer {
  constructor(size = 10) {
    this.frames = new Array(size);
    this.index = 0;
  }

  addFrame(frame) {
    this.frames[this.index] = frame;
    this.index = (this.index + 1) % this.frames.length;
  }

  getLatestFrame() {
    const latestIndex =
      (this.index - 1 + this.frames.length) % this.frames.length;
    return this.frames[latestIndex];
  }
}

const frameBuffer = new FrameBuffer(10); // Store up to 10 frames

export async function streamEsp32(req, res) {
  try {
    // Get the image buffer from ESP32
    const imageBuffer = await esp32Utils.receiveEsp32Stream(req);
    frameBuffer.addFrame(imageBuffer);
  } catch (error) {
    console.error("Stream processing error:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function getEsp32Frame(req, res) {
  try {
    // Set the appropriate headers for MJPEG streaming
    res.setHeader("Content-Type", "multipart/x-mixed-replace; boundary=frame");

    // Send frames in an interval (e.g., 100ms for ~10 FPS)
    const interval = setInterval(() => {
      // Get the latest frame from the buffer
      const imageBuffer = frameBuffer.getLatestFrame();

      if (imageBuffer) {
        // Send the frame in MJPEG format
        res.write(`--frame\r\n`);
        res.write(`Content-Type: image/jpeg\r\n\r\n`);
        res.write(imageBuffer);
        res.write(`\r\n`);
      }
    }, 100); // Adjust the frame rate as needed (100ms for ~10 FPS)

    // Cleanup when the connection is closed
    req.on("close", () => clearInterval(interval));
  } catch (error) {
    console.error("Error while streaming MJPEG:", error);
    res.status(500).json({ error: "Failed to stream MJPEG frames" });
  }
}
