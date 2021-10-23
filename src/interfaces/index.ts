export interface botInfo {
    verified: boolean;
    email: string;
    username: string;
    id: string;
    discriminator: string;
    avatar: string;
    bot: boolean;
}

export interface DiscordWebsocketParsedMessage {
  op?: number;
  s?: number;
  d?: {
    /* eslint-disable camelcase */
    heartbeat_interval?: number;
    session_id?: string;
    v?: number;
    user?: botInfo;
  };
}
