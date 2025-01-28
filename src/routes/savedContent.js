import express from "express";
import * as savedController from "../controllers/savedContent.js";
const router = express.Router();

router.post("/upload", savedController.uploadToDrive());

export default router;
