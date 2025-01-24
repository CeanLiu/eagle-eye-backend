import { WebSocketServer } from "ws";
import handleConnection from "./handler.js";

export default function setupWebSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    handleConnection(ws); // Pass the ws instance to the handler
    console.log(`client ${ws} joined`);
  });

  console.log("WebSocket server is running!");
}
