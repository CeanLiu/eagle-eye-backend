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
    throw new Error("Failed to check ESP32 status: " + error.message);
  }
}

export async function getEsp32Data() {
  try {
    const response = await fetch(`${ESP_URL}/data`);
    if (!response.ok) {
      throw new Error("Failed to fetch data from ESP32");
    }
    return response;
  } catch (error) {
    throw error;
  }
}
