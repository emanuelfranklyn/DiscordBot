const Websocket = require('ws');

class connectionHandler {
  client: any;
  mananger: any;
  packetInterval: number;
  packetLength: number;
  packetQueue: Array<string>;
  constructor(url: string, mananger: any) {
    this.mananger = mananger;

    this.packetInterval = 5; // Time in seconds
    this.packetLength = 4; // Number of packets to send per interval

    this.packetQueue = [];

    this.client = new Websocket(url);
    this.client.onopen = this.onOpen.bind(this);
    this.client.onmessage = this.onMessage.bind(this);
    this.client.onerror = this.onError.bind(this);
    this.client.onclose = this.onClose.bind(this);

    this.mananger.on('ws.discord.status.ready', () => {
      setInterval(() => {
        if (this.packetQueue.length > 0) {
          for (var i = 0; i < this.packetLength; i++) {
            var packet = this.packetQueue.shift();
            if (packet) {
              this.client.send(packet);
            }
          }
        }
      }, this.packetInterval * 1000);
    });
  }

  onOpen(event: any): void {
    this.mananger.emit('ws.discord.event.open', event);
  }

  onMessage(event: any): void {
    this.mananger.emit('ws.discord.event.message', JSON.parse(event.data.toString()));
  }

  onError(event: any): void {
    this.mananger.emit('ws.discord.event.error', event);
  }

  onClose(event: any): void {
    this.mananger.emit('ws.discord.event.close', event);
  }

  sendMessage(message: string, priority: boolean): void {
    if (priority) {
      this.client.send(message);
    } else {
      this.packetQueue.push(message);
    }
  }
}

module.exports = connectionHandler;
