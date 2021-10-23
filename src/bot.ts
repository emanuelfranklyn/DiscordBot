class bot {
  ws: any;
  constructor({ websocket }) {
    this.ws = websocket;
  }

  start(): void {
    this.ws.login('Discord Token');
  }
}

module.exports = bot;
