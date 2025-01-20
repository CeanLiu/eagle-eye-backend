import express from "express";
import * as esp32Controller from "../controllers/esp32.js";
import { checkEsp32 } from "../utils/middleware.js";
const router = express.Router();

router.post("/stream", checkEsp32, esp32Controller.streamEsp32);

export default router;
