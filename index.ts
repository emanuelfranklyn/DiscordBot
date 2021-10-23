const Bot = require('./src/bot');
const WebsocketMananger = require('./src/api/websocket/mananger');
const WebsocketParser = require('./src/api/websocket/parser');
const WebsocketConnectionHandler = require('./src/api/websocket/connectionHandler');

const websocketClient = new WebsocketMananger();
const wsConnectionHandler = new WebsocketConnectionHandler('wss://gateway.discord.gg/?v=9&encoding=json', websocketClient);
const wsConnectionParser = new WebsocketParser(websocketClient);

websocketClient.bindConnectionHandler(wsConnectionHandler);
websocketClient.bindParser(wsConnectionParser);

const discordBotClient = new Bot({
  websocket: websocketClient,
});

// Initiate the bot
discordBotClient.start();
