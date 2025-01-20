import express from "express";
import * as esp32Controller from "../controllers/esp32.js";
import { checkEsp32 } from "../utils/middleware.js";
const router = express.Router();

router.get("/data", checkEsp32, esp32Controller.getEsp32Data);

export default router;
