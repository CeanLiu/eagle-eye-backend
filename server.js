import "dotenv/config";
import express from "express";
import setupWebSocket from "./src/ws/setupWebSocket.js";
import { createServer } from "http";
import { errorHandler } from "./src/utils/middleware.js";
import savedRouter from "./src/routes/savedContent.js";
import cors from "cors";
import uploadRouter from "./src/routes/upload.js";
import videosRouter from "./src/routes/videos.js";

const app = express();
// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Create an HTTP server using Express
const server = createServer(app);

setupWebSocket(server);

// Start the server
server.listen(process.env.PORT, process.env.PUBLIC_IP, () => {
  console.log(
    `Server running on http://${process.env.PUBLIC_IP}:${process.env.PORT}`
  );
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/videos", videosRouter);

app.use("/uploads", uploadRouter);

app.use("/savedContent", savedRouter);
// Example route for handling GET requests
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Express server!" });
});

// Error handling middleware
app.use(errorHandler);
