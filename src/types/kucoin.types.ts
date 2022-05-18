// ---------------------------------------------------------------------------------------------------
//  Api types
// ---------------------------------------------------------------------------------------------------

export interface KucoinApiCredentials {
  /** Public user api key. */
  apiKey: string;
  /** Private user api key. */
  apiSecret: string;
  /** User api passphrase. */
  apiPassphrase: string;
}

export interface KucoinApiOptions {
  /** Public user api key. */
  apiKey: string;
  /** Private user api key. */
  apiSecret: string;
  /** User api passphrase. */
  apiPassphrase: string;
  /** Indica si l'api està en mode test o en real. */
  isTest?: boolean,
  // /** Override the max size of the request window (in ms). */
  // recvWindow?: number;
}


/**
 * ```typescript
 * { params?: any; headers?: { [key: string]: string | number }; isPublic?: boolean; createSignature?: boolean; baseUrlOverride?: string }
 * ```
 */
 export interface KucoinApiResquestOptions {
  params?: any;
  headers?: { [key: string]: string | number };
  isPublic?: boolean;
  baseUrlOverride?: string;
}


/** {@link https://docs.kucoin.com/#apply-connect-token Apply connect token} */
export interface KucoinWebsocketTokenResponse {
  instanceServers: KucoinWebsocketServer[];
  token: string;
}

/** {@link https://docs.kucoin.com/#apply-connect-token Apply connect token} */
export interface KucoinWebsocketServer {
  /** Websocket server address for establishing connection. Ex: `'wss://push1-v2.kucoin.com/endpoint'`. */
  endpoint: string;
  /** Protocol supported. Ex: `websocket`. */
  protocol: string;
  /** Indicate whether SSL encryption is used. */
  encrypt: boolean;
  /** Recommended to send ping interval in millisecond. */
  pingInterval: number;
  /** After such a long time(millisecond), if you do not receive pong, it will be considered as disconnected. */
  pongTimeout: number;
}



// ---------------------------------------------------------------------------------------------------
//  shared types
// ---------------------------------------------------------------------------------------------------

export type KucoinMarketType = 'spot' | 'futures' | 'margin';

export type KucoinOrderSide = 'buy' | 'sell';

export type KucoinOrderType = 'limit' | 'market' | 'limit_stop' | 'market_stop';

export type KucoinStopOrderType = 'up' | 'down';

export type KucoinOrderTimeInForce = 'GTC' | 'IOC';

export type KucoinOrderStatus = 'NEW' | 'PARTIALLY_FILLED' | 'FILLED' | 'CANCELED' | 'CANCELLING' | 'PENDING_CANCEL' | 'REJECTED' | 'EXPIRED';

export type KucoinOrderExecutionType = 'NEW' | 'CANCELED' | 'REJECTED' | 'TRADE' | 'EXPIRED';

export type KucoinTradeType = 'TRADE' | 'MARGIN_TRADE';



