import "dotenv/config";

const ESP_URL = process.env.ESP32_BASE_URL;

//checks if esp32 is ready
export async function checkEsp32Status() {
  try {
    const response = await fetch(`${ESP_URL}/status`);
    if (response.status === 200) {
      return true;
    } else {
      const error = new Error(`ESP32 returned status: ${response.status}`);
      error.statusCode = response.status; // Set the status code here
      error.message = response.message;
      throw error; // Throw the custom error
    }
  } catch (error) {
    throw new Error(`Failed to check ESP32 status: ${error.message}`);
  }
}

export function receiveEsp32Stream(req) {
  return new Promise((resolve, reject) => {
    let imageData = Buffer.alloc(0);
    req.on("data", (chunk) => {
      imageData = Buffer.concat([imageData, chunk]);
      console.log("Received chunk of size:", chunk.length);
    });

    req.on("end", () => {
      console.log("Final image size:", imageData.length, "bytes");
      resolve(imageData);
    });

    req.on("error", (err) => {
      console.error("Error receiving data:", err);
      reject(err);
    });
  });
}
