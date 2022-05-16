import EventEmitter from 'events';
import { Subject, Subscription } from 'rxjs';

import { KucoinMarketType } from './types/kucoin.types';
import { KucoinWebsocketOptions, WsConnectionState, WsStreamType } from './types/kucoin-websocket.types';
import { KucoinApi } from './kucoin-api';
import { KucoinApiSpot } from './kucoin-api-spot';
import { KucoinApiFutures } from './kucoin-api-futures';


/** {@link https://docs.kucoin.com/#websocket-feed Websocket Feed} */
export class KucoinWebsocket extends EventEmitter {
  /** Opcions de configuració. */
  protected options: KucoinWebsocketOptions;
  /** Referència a la instància del websocket subjacent. */
  protected ws: WebSocket
  /** Referència a la instància del client API. */
  protected api: KucoinApi;
  /** Estat de la connexió. */
  protected status: WsConnectionState = 'initial';
  /** Subscripció al interval que envia un ping al servidor per mantenir viva la connexió.  */
  protected pingInterval?: Subscription;
  /** Subscriptor al timer que controla la resposta del servidor. */
  protected pongTimer?: Subscription;
  /** Clau associada amb l'stream d'usuari. */
  protected listenKey?: string;
  /** Subscriptor al timer que controla la renovació de la clau. */
  protected listenKeyTimer?: Subscription;
  /** Emisors de missatges. */
  protected emitters: { [WsStreamEmitterType: string]: Subject<any> } = {};

  constructor(
    options: KucoinWebsocketOptions,
  ) {
    super();
    this.options = { ...this.defaultOptions, ...options };

    this.initialize();
  }

  // ---------------------------------------------------------------------------------------------------
  //  options
  // ---------------------------------------------------------------------------------------------------

  get market(): KucoinMarketType { return this.options?.market; }

  get streamType(): WsStreamType { return this.options?.streamType; }

  get apiKey(): string { return this.options?.apiKey; }

  get apiSecret(): string { return this.options?.apiSecret; }
  
  get apiPassphrase(): string { return this.options?.apiPassphrase; }

  get isTest(): boolean { return this.options?.isTest; }

  get reconnectPeriod(): number { return this.options?.reconnectPeriod; }

  get pingPeriod(): number { return this.options?.pingPeriod; }

  get pongPeriod(): number { return this.options?.pongPeriod; }

  get defaultOptions(): Partial<KucoinWebsocketOptions> {
    return {
      isTest: false,
      reconnectPeriod: 5 * 1000,
      pingPeriod: 2 * 60 * 1000,
      pongPeriod: 6 * 60 * 1000,
    }
  }
  
  // ---------------------------------------------------------------------------------------------------
  //  api
  // ---------------------------------------------------------------------------------------------------

  protected getApiClient(): KucoinApi {
    const { apiKey, apiSecret, apiPassphrase, isTest } = this.options;
    return this.market === 'spot' ? new KucoinApiSpot({ apiKey, apiSecret, apiPassphrase, isTest }) :  new KucoinApiFutures({ apiKey, apiSecret, apiPassphrase, isTest });
  }

  protected async initialize() {
    // Instanciem un client per l'API.
    this.api = this.getApiClient();
    // Iniciem la connexió amb l'stream de l'exchange.
    this.connect();
  }

  // ---------------------------------------------------------------------------------------------------
  //  connect . terminate
  // ---------------------------------------------------------------------------------------------------

  get baseUrl(): string {
    switch (this.market) {
      case 'spot': return this.isTest ? `wss://testnet.binance.vision` : `wss://stream.binance.com:9443`;
      case 'futures': return this.isTest ? `wss://stream.binancefuture.com` : `wss://fstream.binance.com`;
      case 'margin': return this.isTest ? `wss://testnet.binance.vision` : `wss://stream.binance.com:9443`;
    }
  }

  get url(): string {
    return this.streamType === 'market' ? `/api/v1/bullet-public` : `/api/v1/bullet-private`;
    // const format = this.streamFormat === 'raw' ? 'ws' : 'stream';
    // const listenKey = this.streamType === 'user' ? (format === 'ws' ? `/${this.listenKey}` : `?streams=${this.listenKey}`) : '';
    // return `${this.baseUrl}/${format}${listenKey}`;
  }

  async connect() {}
}
