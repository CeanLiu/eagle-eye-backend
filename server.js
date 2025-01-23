import "dotenv/config";
import express from "express";
import { createServer } from "http"; // Needed to use the same server for Express and WebSocket
import { WebSocketServer } from "ws"; // WebSocket server
import { errorHandler } from "./src/utils/middleware.js";
import esp32Router from "./src/routes/esp32.js";
import cors from "cors";

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Create an HTTP server using Express
const server = createServer(app);

// WebSocket Server
const wss = new WebSocketServer({ server });

// Manage connected WebSocket clients
const clients = new Set();

// Handle WebSocket connections
wss.on("connection", (ws) => {
  // Add client to the set
  clients.add(ws);
  console.log("New WebSocket connection");

  // Handle messages from clients
  ws.on("message", (message) => {
    // Broadcast the message to all other connected clients
    for (const client of clients) {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(message); // Forward the data to other clients
      }
    }
  });

  // Handle client disconnection
  ws.on("close", () => {
    clients.delete(ws); // Remove client from the set
    console.log("WebSocket connection closed");
  });

  // Optional: Send a welcome message to the client
  ws.send("Welcome to the WebSocket server!");
});

// Start the HTTP and WebSocket server
server.listen(process.env.PORT, process.env.PUBLIC_IP, () => {
  console.log(
    `Server running on http://${process.env.PUBLIC_IP}:${process.env.PORT}`
  );
});

// Use the esp32 routes
app.use("/esp32", esp32Router);

// Example route for handling GET requests
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Express server!" });
});

// Error handling middleware
app.use(errorHandler);
