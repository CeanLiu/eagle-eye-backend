import * as esp32Utils from "../utils/esp32.js";

export async function streamEsp32(req, res) {
  try {
    console.log(req);
    res.send(req);
    //handle the data;
  } catch (error) {
    throw new Error(`Failed to fetch data from ESP32: ${error.message}`);
  }
}
