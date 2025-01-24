export default class Client {
  #type;
  constructor(ws) {
    this.ws = ws;
    this.id = ws.id;
    this.#type = null;
  }

  getType() {
    return this.#type;
  }
  setType(type) {
    this.#type = ClientTypes[type];
  }

  sendMessage(message) {
    if (this.ws.readystate === this.ws.OPEN) {
      this.ws.send(message);
    }
  }
}
