import Client from "./client.js";
import * as esp32Controller from "../controllers/esp32.js";
import userController from "../controllers/user.js";
const clients = new Set();

export default function handleConnection(ws) {
  const client = new Client(ws);
  clients.add(client);

  ws.on("message", (data, isBinary) => {
    try {
      if (isBinary) {
        esp32Controller.handleImage(clients, data);
      } else {
        const message = JSON.parse(data);

        if (message.type === "setType") {
          client.setType(message.value); // Update the client type
          console.log(`client ${ws} joined`);
        } else {
          if (client.getType() === "esp32") {
            esp32Controller.handleMessage(clients, data);
          } else {
            userController.handleMessage(client, message);
          }
        }
      }
    } catch (error) {
      console.error("Error handling message:", error);
    }
  });

  ws.on("close", () => {
    clients.delete(client);
    console.log(`Client disconnected: {${client.getType()}: ${client.id}}`);
  });
}
