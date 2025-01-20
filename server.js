import "dotenv/config";
import express from "express";
import { errorHandler } from "./src/utils/middleware.js";
import esp32Router from "./src/routes/esp32.js";

const app = express();

app.use("/esp32/", esp32Router);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server running on port 5000");
});
