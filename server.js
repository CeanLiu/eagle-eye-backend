import "dotenv/config";
import express from "express";
import { errorHandler } from "./src/utils/middleware.js";
import esp32Router from "./src/routes/esp32.js";
import { WebSocketServer } from "ws";

const app = express();

// Create the HTTP server using Express
const server = app.listen(process.env.PORT, process.env.PUBLIC_IP, () => {
  console.log(
    `Server running on http://${process.env.PUBLIC_IP}:${process.env.PORT}`
  );
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("A new WebSocket connection established.");

  ws.send(JSON.stringify({ message: "Welcome to the WebSocket server!" }));
  ws.on("message", (message) => {
    console.log("Received message:", message);
    ws.send(`Echo: ${message}`);
  });
  ws.on("close", () => {
    console.log("A WebSocket connection was closed.");
  });
});

// Use the esp32 routes
app.use("/esp32", esp32Router);

// Error handling middleware
app.use(errorHandler);
