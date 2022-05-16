import { KucoinMarketType } from "./kucoin.types";


export type WsConnectionState = 'initial' | 'connecting' | 'connected' | 'reconnecting' | 'closing';

export type WsStreamType = 'user' | 'market';

export interface KucoinWebsocketOptions {
  /** Market associat. S'utilitza per discernir les variants de futurs: 'usdm' | 'coinm'. */
  market: KucoinMarketType;
  /** Indica si l'stream és d'usuari o de mercat. */
  streamType: WsStreamType;
  /** Public user api key. */
  apiKey?: string;
  /** Private user api key. */
  apiSecret?: string;
  /** User api passphrase. */
  apiPassphrase?: string;
  /** Indica si l'api està en mode test o en real. */
  isTest?: boolean,
  /** Indica el periode de delay abans de tornar a connectar. */
  reconnectPeriod?: number;
  /** Temps en milisegons per l'interval qua ha de manetenir viva la connexió. */
  pingPeriod?: number;
  /** Temps en milisegons pel timeout si no hi ha la resposta per part del servidor. */
  pongPeriod?: number;
}
