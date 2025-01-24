export function handleImage(clients, image) {
  for (const client of clients) {
    if (client.getType() === "user") {
      client.sendMessage(image);
    }
  }
}

export function handleMessage(clients, message) {
  for (const client of clients) {
    if (clients.getType() === "user") {
      client.sendMessage(message);
    }
  }
}
