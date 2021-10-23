const eventEmmiter = require('events');
const SystemDataLib = require('../../libs/systemData');

class mananger extends eventEmmiter {
  connection: any;
  constructor() {
    super();
    this.connectionHandler = null;
    this.parser = null;
    this.systemData = new SystemDataLib();
  }

  bindConnectionHandler(connectionHandler): void {
    this.connectionHandler = connectionHandler;
  }

  bindParser(parser): void {
    this.parser = parser;
  }

  login(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.connectionHandler) {
        const systemData = this.systemData.getSystemData();
        this.connectionHandler.sendMessage(JSON.stringify({
          op: 2,
          d: {
            token: token,
            intents: 513,
            properties: {
              $os: systemData.name,
              $browser: `Nodejs ${systemData.node}`,
              $device: systemData.os,
            },
          },
        }));
      } else {
        reject(new Error('Connection handler is not binded'));
      }
    });
  }
}

module.exports = mananger;
