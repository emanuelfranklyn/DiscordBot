import { DiscordWebsocketParsedMessage, botInfo } from '../../interfaces';

class parser {
  mananger: any;
  connectionKeepAliver: any;
  sequenceNumber?: number;
  connectionConfirmation: boolean;
  connectionStabilized: boolean;
  sessionId: string;
  apiVersion: number;
  botInfo: botInfo;
  constructor(mananger: any) {
    this.mananger = mananger;
    this.mananger.on('ws.discord.event.open', this.open.bind(this));
    this.mananger.on('ws.discord.event.message', this.message.bind(this));
    this.mananger.on('ws.discord.event.error', this.error.bind(this));
    this.mananger.on('ws.discord.event.close', this.close.bind(this));

    // Connection Stay Alive stuff
    this.connectionKeepAliver = null;
    this.sequenceNumber = null;
    this.connectionConfirmation = false;
    this.connectionStabilized = false;

    // Connection stuff
    this.sessionId = null;
    this.apiVersion = null;
    this.botInfo = {
      verified: false,
      email: null,
      username: null,
      id: null,
      discriminator: null,
      avatar: null,
      bot: false,
    };
  }

  open(event: any): void {
  }

  message(message: DiscordWebsocketParsedMessage): void {
    console.log(message);
    if (message.s) {
      this.sequenceNumber = message.s;
    }
    if (message.op) {
      switch (message.op) {
        case 11:
        case 10:
          this.connectionStayAliveHandler(message);
          break;
        case 0:
          this.MainProcessor(message);
          break;
      }
    }
  }

  error(): void {

  }

  close(): void {

  }

  connectionStayAliveHandler(message: DiscordWebsocketParsedMessage): void {
    if (message.op === 10) {
      this.connectionKeepAliver = setInterval(() => {
        this.mananger.connectionHandler.sendMessage(JSON.stringify({
          op: 1,
          d: this.sequenceNumber,
        }), true);
        this.connectionConfirmation = false;
        this.mananger.emit('ws.discord.event.emitted.heartbeat');
        setTimeout(() => {
          if (!this.connectionConfirmation) {
            console.log('Disconnected!');
            this.mananger.emit('ws.discord.disconnected');
          }
        }, 20000);
      }, message.d.heartbeat_interval);
    } else if (message.op === 11) {
      if (!this.connectionConfirmation) {
        this.connectionConfirmation = true;
      }
    }
  }

  MainProcessor(message: DiscordWebsocketParsedMessage): void {
    if (message.op === 0) {
      this.connectionStabilized = true;
      this.mananger.emit('ws.discord.status.ready', message);
      this.sessionId = message.d.session_id;
      this.apiVersion = message.d.v;
      this.botInfo.verified = message.d.user.verified;
      this.botInfo.email = message.d.user.email;
      this.botInfo.username = message.d.user.username;
      this.botInfo.id = message.d.user.id;
      this.botInfo.discriminator = message.d.user.discriminator;
      this.botInfo.avatar = message.d.user.avatar;
      this.botInfo.bot = message.d.user.bot;
    }
  }
}

module.exports = parser;
