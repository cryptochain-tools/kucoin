import WebSocket from 'isomorphic-ws';
import EventEmitter from 'events';
import { Subject, interval, timer, Subscription } from 'rxjs';

import { KucoinApi } from './kucoin-api';
import { KucoinApiSpot } from './kucoin-api-spot';
import { KucoinApiFutures } from './kucoin-api-futures';
import { KucoinMarketType, KucoinWebsocketTokenResponse } from './types/kucoin.types';
import {
  KucoinAvailableBalanceEvent,
  KucoinSymbolTickerEvent,
  KucoinTradeOrdersEvent,
  KucoinWebsocketOptions,
  WsConnectionState,
  WsStreamEmitterType,
  WsStreamType,
} from './types/kucoin-websocket.types';

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
  protected pingTimer?: Subscription;
  /** Subscriptor al timer que controla la resposta del servidor. */
  protected pongTimer?: Subscription;
  /** Identificador de connexió rebut del servidor websocket. */
  protected connectId?: string;
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

  get pingInterval(): number { return this.options?.pingInterval; }

  get pongTimeout(): number { return this.options?.pongTimeout; }

  get defaultOptions(): Partial<KucoinWebsocketOptions> {
    return {
      isTest: false,
      reconnectPeriod: 5 * 1000,
      pingInterval: 18 * 1000,
      pongTimeout: 10 * 1000,
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
  
  /** {@link https://docs.kucoin.com/futures/#apply-for-connection-token Apply for Connection Token} */
  async connect() {
    // Obtenim la info per la connexió amb el websocket.
    const wsType = this.streamType === 'market' ? 'public' : 'private';
    // const wsInfo: KucoinWebsocketTokenResponse = await this.api.getWebsocketToken(wsType).catch(err => console.error(err));
    this.api.getWebsocketToken(wsType).then((wsInfo: KucoinWebsocketTokenResponse) => {
      console.log(wsInfo);
      // TODO: Throw error if !wsInfo.
      const { endpoint, pingInterval, pongTimeout } = wsInfo.instanceServers[0];
      const url = `${endpoint}?token=${wsInfo.token}`;
      // Ajustem els paràmetres segons el nou servidor.
      this.options.pingInterval = pingInterval || this.defaultOptions.pingInterval;
      this.options.pongTimeout = pongTimeout || this.defaultOptions.pongTimeout;
  
      // Nova instància.
      console.log(this.wsId, '=> connecting...', url);
      this.ws = new WebSocket(url);
      // Listeners.
      this.ws.onopen = event => this.onWsOpen(event);
      this.ws.onerror = event => this.onWsError(event);
      this.ws.onclose = event => this.onWsClose(event);
      this.ws.onmessage = event => this.onWsMessage(event);
      // ping . pong
      if (typeof this.ws.on === 'function') {
        this.ws.on('ping', event => this.onWsPing(event));
        this.ws.on('pong', event => this.onWsPong(event));
      }
      // Not sure these work in the browser, the traditional event listeners are required for ping/pong frames in node.
      (this.ws as any).onping = (event: WebSocket.Event) => this.onWsPing(event);
      (this.ws as any).onpong = (event: WebSocket.Event) => this.onWsPong(event);

    }).catch(err => console.error(err));
  }

  reconnect() {
    if (this.status === 'reconnecting') { return; }
    this.status = 'reconnecting';
    this.close();
    setTimeout(() => this.connect(), this.reconnectPeriod);
  }

  async close() {
    try {
      if (this.status !== 'reconnecting') { this.status = 'closing'; }
      if (this.pingTimer) { this.pingTimer.unsubscribe(); }
      if (this.pongTimer) { this.pongTimer.unsubscribe(); }
      // if (this.streamType === 'user') { await this.api.closeUserDataListenKey(this.listenKey); }
      this.ws.close();
      // #168: ws.terminate() undefined in browsers.
      if (typeof this.ws.terminate === 'function') { this.ws.terminate(); }

    } catch (error) {
      console.error(error);
    }
  }

  destroy() {
    Object.keys(this.emitters).map(WsStreamEmitterType => this.emitters[WsStreamEmitterType].complete());
    this.emitters = {};
  }


  // ---------------------------------------------------------------------------------------------------
  //  open . close . error
  // ---------------------------------------------------------------------------------------------------

  protected onWsOpen(event: WebSocket.Event) {
    if (this.status === 'reconnecting') {
      console.log(this.wsId, '=> reconnected!');
      this.emit('reconnected', { event });
    } else {
      console.log(this.wsId, '=> connected!');
      this.emit('open', { event });
    }
    this.status = 'connected';
    // Iniciem la comunicació ping-pong.
    if (this.pingTimer) { this.pingTimer.unsubscribe(); }
    this.pingTimer = interval(this.pingInterval).subscribe(() => this.ping());
    // Establim les subscripcions dels topics.
    this.respawnTopicSubscriptions();
  }

  protected onWsClose(event: WebSocket.CloseEvent) {
    console.log(this.wsId, '=> closed');
    if (this.status !== 'closing') {
      this.reconnect();
      this.emit('reconnecting', { event });
    } else {
      this.status = 'initial';
      this.emit('close', { event });
    }
  }

  protected onWsError(event: WebSocket.ErrorEvent) {
    // console.log(this.wsId, '=> onWsError');
    console.error(`${this.wsId} =>`, event?.error || event);
  }


  // ---------------------------------------------------------------------------------------------------
  //  ping . pong
  // ---------------------------------------------------------------------------------------------------

  protected ping() {
    console.log(this.wsId, `=> Sending ping...`);
    try {
      if (this.pongTimer) { this.pongTimer.unsubscribe(); }
      
      if (typeof this.ws.ping === 'function') {
        this.pongTimer = timer(this.pongTimeout).subscribe(() => {
          console.log(this.wsId, `=> Pong timeout - closing socket to reconnect`);
          this.reconnect();
        });
        this.ws.ping();
      } else {
        // this.ws.send(0x09);
        // this.ws.send(Buffer.alloc(0x09));
      }

    } catch (error) {
      console.error(this.wsId, `=> Failed to send WS ping`, error);
      // TODO: Notificar l'error.
    }
  }

  protected onWsPing(event: any) {
    try {
      console.log(this.wsId, '=> Received ping, sending pong');
      if (typeof this.ws.pong === 'function') {
        this.ws.pong();
      } else {
        // this.ws.send(0xA);
      }

    } catch (error) {
      console.error(this.wsId, `=> Failed to send WS pong`, error);
      // TODO: Notificar l'error.
    }
  }

  protected onWsPong(event: any) {
    console.log(this.wsId, '=> Received pong, clearing timer');
    if (this.pongTimer) { this.pongTimer.unsubscribe(); }
  }


  // ---------------------------------------------------------------------------------------------------
  //  message event
  // ---------------------------------------------------------------------------------------------------

  protected onWsMessage(event: WebSocket.MessageEvent) {
    // console.log(this.wsId, event.data);
    // console.log(event.data);
    // console.log(this.parseWsMessage(event));
    const data = this.parseWsMessage(event);
    this.emit('message', data);
    // console.log('event type =>', this.discoverEventType(data));
    switch (this.discoverEventType(data)) {
      case 'welcome':
        this.connectId = data.id;
        console.log(this.wsId, '=> connectId:', this.connectId);
        break;
      case 'symbolTicker':
      case 'orderUpdate':
      case 'balanceUpdate':
      case 'positionChange':
        this.emitTopicEvent(data);
        break;
      default:
        console.log('onWsMessage =>', data);
        console.log(JSON.stringify(data));
    }
  }

  protected parseWsMessage(event: any): any {
    if (typeof event === 'string') {
      const parsedEvent = JSON.parse(event);
      if (parsedEvent.data) {
        return this.parseWsMessage(parsedEvent.data);
      }
    }
    return event?.data ? JSON.parse(event.data) : event;
  }

  protected discoverEventType(data: any): WsStreamEmitterType {
    const obj = Array.isArray(data) ? (data.length ? data[0] : undefined) : data;
    if (typeof obj === 'object') {
      if (Object.keys(obj).length === 2 && obj.hasOwnProperty('id') && obj.hasOwnProperty('type')) {
        return obj.type;
      } else if (obj.hasOwnProperty('topic')) {
        if (obj.topic.startsWith(`/contractMarket/ticker`)) {
          return 'symbolTicker';
        } else if (obj.topic.startsWith(`/contractMarket/tradeOrders`)) {
          return 'orderUpdate';
        } else if (obj.topic === '/contractAccount/wallet' && obj.subject === 'availableBalance.change') {
          return 'balanceUpdate';
        } else if (obj.topic.startsWith('/contract/position') && obj.subject === 'position.change') {
          return 'positionChange';
        }
      }
    }
    return undefined;
  }


  // ---------------------------------------------------------------------------------------------------
  //  Market (public)
  // ---------------------------------------------------------------------------------------------------

  /** {@link https://docs.kucoin.com/futures/#get-real-time-symbol-ticker Get Real-Time Symbol Ticker} */
  symbolTicker(symbol: string): Subject<KucoinSymbolTickerEvent> {
    // const topic = `/market/ticker:${symbol}`;
    const topic = `/contractMarket/ticker:${symbol}`;
    const subject = `ticker`;
    return this.registerTopicSubscription(topic, subject);
  }

  // ---------------------------------------------------------------------------------------------------
  //  User (private)
  // ---------------------------------------------------------------------------------------------------

  /** {@link https://docs.kucoin.com/futures/#trade-orders Trade Orders} */
  orderUpdate(): Subject<KucoinTradeOrdersEvent> {
    const topic = `/spotMarket/tradeOrders`;
    const subject = `orderChange`;
    return this.registerTopicSubscription(topic, subject);
  }

  /** {@link https://docs.kucoin.com/futures/#account-balance-events Available Balance Event} */
  balanceUpdate(): Subject<KucoinAvailableBalanceEvent> {
    // const topic = `/account/balance`;
    const topic = `/contractAccount/wallet`;
    const subject = `availableBalance.change`;
    return this.registerTopicSubscription(topic, subject);
  }


  // ---------------------------------------------------------------------------------------------------
  //  Topics subscriptions
  // ---------------------------------------------------------------------------------------------------

  private subscriptionId = 0;

  protected registerTopicSubscription(topic: string, subject?: string) {
    const topicKey = subject ? `${topic}#${subject}` : topic;
    const stored = this.emitters[topicKey];
    if (stored) { return stored; }
    const created = new Subject<any>();
    this.emitters[topicKey] = created;
    // console.log('Register new topic =>', topicKey);
    if (this.status === 'connected') { this.subscribeTopic(topic, subject); }
    return created;
  }

  protected respawnTopicSubscriptions() {
    const topics: string[] = [];
    Object.keys(this.emitters).map(topicKey => {
      const stored = this.emitters[topicKey];
      if (this.isSubjectUnobserved(stored)) {
        if (stored) { stored.complete(); }
        delete this.emitters[topicKey];
      } else {
        const [topic, subject] = topicKey.split('#');
        this.subscribeTopic(topic, subject);
      }
    });
  }

  protected emitTopicEvent(event: any) {
    if (typeof event !== 'object' || !event.hasOwnProperty('topic')) {
      throw (`No s'ha pogut interpretar el tipus d'event`);
    }
    const topic = event.topic;
    const subject = event.subject;
    const topicKey = subject ? `${topic}#${subject}` : topic;
    const stored = this.emitters[topicKey];
    if (!stored) {
      throw (`No s'ha trobat l'emisor pel tòpic ${topic}#${subject}`);
    }
    if (this.isSubjectUnobserved(stored)) {
      this.unsubscribeTopic(topic, subject);
      if (stored) { stored.complete(); }
      delete this.emitters[topicKey];
    } else {
      // console.log(`emit ${topicKey} =>`, event);
      stored.next(event);
    }
  }

  protected isSubjectUnobserved(emitter: Subject<any>): boolean {
    return !emitter || emitter.closed || !emitter.observers?.length;
  }

  protected subscribeTopic(topic: string, subject?: string) {
    console.log(this.wsId, '=> subscribing...', { topic, subject });
    const id = ++this.subscriptionId;
    const data: any = { type: "subscribe", id, topic, response: true };
    if (subject) { data.subject = subject; }
    this.ws.send(JSON.stringify(data), error => error ? this.onWsError(error as any) : undefined);
  }

  protected unsubscribeTopic(topic: string, subject?: string) {
    console.log(this.wsId, '=> unsubscribing...', { topic, subject });
    const id = ++this.subscriptionId;
    const data: any = { type: "unsubscribe", id, topic, response: true };
    if (subject) { data.subject = subject; }
    this.ws.send(JSON.stringify(data), error => error ? this.onWsError(error as any) : undefined);
  }


  // ---------------------------------------------------------------------------------------------------
  //  log
  // ---------------------------------------------------------------------------------------------------

  protected get wsId(): string { return `${this.market}-${this.streamType}-ws`; }
}
