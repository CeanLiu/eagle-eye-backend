import express from "express";
import * as esp32Controller from "../controllers/esp32.js";
import { checkEsp32 } from "../utils/middleware.js";
const router = express.Router();

router.post("/frameData", esp32Controller.streamEsp32);

router.get("/getFrames", esp32Controller.getEsp32Frame);

export default router;
