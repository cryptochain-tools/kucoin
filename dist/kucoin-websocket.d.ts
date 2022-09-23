/// <reference types="ws" />
/// <reference types="node" />
import WebSocket from 'isomorphic-ws';
import EventEmitter from 'events';
import { Subject, Subscription } from 'rxjs';
import { KucoinApi } from './kucoin-api';
import { KucoinMarketType } from './types/kucoin.types';
import { KucoinWithdrawalHoldEvent } from './types/kucoin-websocket.types';
import { KucoinAvailableBalanceEvent, KucoinFundingSettlementEvent, KucoinPositionChangeByMarkPriceEvent, KucoinPositionChangeByOperationsEvent, KucoinRiskLimitChangeEvent, KucoinSymbolTickerEvent, KucoinSymbolTickerV2Event, KucoinTradeOrdersEvent, KucoinWebsocketOptions, WsConnectionState, WsStreamEmitterType, WsStreamType } from './types/kucoin-websocket.types';
export declare class KucoinWebsocket extends EventEmitter {
    protected options: KucoinWebsocketOptions;
    protected ws: WebSocket;
    protected api: KucoinApi;
    protected status: WsConnectionState;
    protected pingTimer?: Subscription;
    protected pongTimer?: Subscription;
    protected connectId?: string;
    protected emitters: {
        [WsStreamEmitterType: string]: Subject<any>;
    };
    constructor(options: KucoinWebsocketOptions);
    get market(): KucoinMarketType;
    get streamType(): WsStreamType;
    get apiKey(): string;
    get apiSecret(): string;
    get apiPassphrase(): string;
    get isTest(): boolean;
    get reconnectPeriod(): number;
    get pingInterval(): number;
    get pongTimeout(): number;
    get defaultOptions(): Partial<KucoinWebsocketOptions>;
    protected getApiClient(): KucoinApi;
    protected initialize(): Promise<void>;
    connect(): Promise<void>;
    reconnect(): void;
    close(): Promise<void>;
    destroy(): void;
    protected onWsOpen(event: WebSocket.Event): void;
    protected onWsClose(event: WebSocket.CloseEvent): void;
    protected onWsError(event: WebSocket.ErrorEvent): void;
    protected ping(): void;
    protected onWsPing(event: any): void;
    protected onWsPong(event: any): void;
    protected onWsMessage(event: WebSocket.MessageEvent): void;
    protected parseWsMessage(event: any): any;
    protected discoverEventType(data: any): WsStreamEmitterType;
    symbolTicker(symbol: string): Subject<KucoinSymbolTickerEvent>;
    symbolTickerV2(symbol: string): Subject<KucoinSymbolTickerV2Event>;
    klines(symbol: string, type: string): Subject<KucoinSymbolTickerV2Event>;
    orderUpdate(): Subject<KucoinTradeOrdersEvent>;
    balanceUpdate(): Subject<KucoinAvailableBalanceEvent>;
    withdrawHold(): Subject<KucoinWithdrawalHoldEvent>;
    positionChange(symbol: string): Subject<KucoinPositionChangeByOperationsEvent | KucoinPositionChangeByMarkPriceEvent>;
    fundingSettlement(symbol: string): Subject<KucoinFundingSettlementEvent>;
    riskLimitChange(symbol: string): Subject<KucoinRiskLimitChangeEvent>;
    private subscriptionId;
    protected registerTopicSubscription(topic: string, subject?: string): Subject<any>;
    protected respawnTopicSubscriptions(): void;
    protected emitTopicEvent(event: any): void;
    protected isSubjectUnobserved(emitter: Subject<any>): boolean;
    protected subscribeTopic(topic: string, subject?: string): void;
    protected unsubscribeTopic(topic: string, subject?: string): void;
    protected get wsId(): string;
}
//# sourceMappingURL=kucoin-websocket.d.ts.map