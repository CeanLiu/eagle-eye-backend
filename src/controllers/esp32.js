import * as esp32Utils from "../utils/esp32.js";

export async function getEsp32Data(req, res) {
  try {
    const data = await esp32Utils.getEsp32Data();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from ESP32" });
  }
}
