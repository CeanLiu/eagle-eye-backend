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
    this.#type = type;
  }

  sendMessage(message) {
    this.ws.send(message);
  }
}
