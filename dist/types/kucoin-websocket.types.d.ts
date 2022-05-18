import { KucoinMarketType, KucoinOrderSide } from "./kucoin.types";
export declare type WsConnectionState = 'initial' | 'connecting' | 'connected' | 'reconnecting' | 'closing';
export declare type WsStreamType = 'user' | 'market';
export declare type WsUserStreamEmitterType = 'positionChange' | 'fundingSettlement' | 'riskLimitChange' | 'balanceUpdate' | 'withdrawHold' | 'orderUpdate';
export declare type WsMarketStreamEmitterType = 'symbolTicker' | 'symbolTickerV2';
export declare type WsStreamEmitterType = 'welcome' | WsUserStreamEmitterType | WsMarketStreamEmitterType;
export interface KucoinWebsocketOptions {
    market: KucoinMarketType;
    streamType: WsStreamType;
    apiKey?: string;
    apiSecret?: string;
    apiPassphrase?: string;
    isTest?: boolean;
    reconnectPeriod?: number;
    pingInterval?: number;
    pongTimeout?: number;
}
export interface KucoinTopicSubscription {
    id: number;
    type: 'subscribe' | 'unsubscribe';
    topic: string;
    subject?: string;
    privateChannel?: boolean;
    response?: boolean;
}
export interface KucoinSymbolTickerEvent {
    subject: string;
    topic: string;
    data: {
        symbol: string;
        sequence: number;
        side: KucoinOrderSide;
        price: number;
        size: number;
        tradeId: string;
        bestBidSize: number;
        bestBidPrice: number;
        bestAskPrice: number;
        bestAskSize: number;
        ts: number;
    };
}
export interface KucoinSymbolTickerV2Event {
    subject: string;
    topic: string;
    data: {
        symbol: string;
        bestBidSize: number;
        bestBidPrice: number;
        bestAskPrice: number;
        bestAskSize: number;
        ts: number;
    };
}
export interface KucoinTradeOrdersEvent {
    type: string;
    topic: string;
    subject: string;
    channelType: string;
    data: {
        orderId: string;
        symbol: string;
        type: string;
        status: string;
        matchSize: string;
        matchPrice: string;
        orderType: string;
        side: string;
        price: string;
        size: string;
        remainSize: string;
        filledSize: string;
        canceledSize: string;
        tradeId: string;
        clientOid: string;
        orderTime: number;
        oldSize: string;
        liquidity: string;
        ts: number;
    };
}
export interface KucoinOrderMarginEvent {
    userId: string;
    topic: string;
    subject: string;
    data: {
        orderMargin: number;
        currency: string;
        timestamp: number;
    };
}
export interface KucoinAvailableBalanceEvent {
    userId: string;
    topic: string;
    subject: string;
    data: {
        availableBalance: number;
        holdBalance: string;
        currency: number;
        timestamp: number;
    };
}
export interface KucoinWithdrawalHoldEvent {
    userId: string;
    topic: string;
    subject: string;
    data: {
        withdrawHold: number;
        currency: number;
        timestamp: number;
    };
}
export interface KucoinPositionChangeByOperationsEvent {
    type: string;
    userId: string;
    channelType: string;
    topic: string;
    subject: string;
    data: {
        realisedGrossPnl: string;
        symbol: number;
        crossMode: boolean;
        liquidationPrice: number;
        posLoss: number;
        avgEntryPrice: number;
        unrealisedPnl: number;
        markPrice: number;
        posMargin: number;
        autoDeposit: boolean;
        riskLimit: number;
        unrealisedCost: number;
        posComm: number;
        posMaint: number;
        posCost: number;
        maintMarginReq: number;
        bankruptPrice: number;
        realisedCost: number;
        markValue: number;
        posInit: number;
        realisedPnl: number;
        maintMargin: number;
        realLeverage: number;
        changeReason: string;
        currentCost: number;
        openingTimestamp: number;
        currentQty: number;
        delevPercentage: number;
        currentComm: number;
        realisedGrossCost: number;
        isOpen: boolean;
        posCross: number;
        currentTimestamp: number;
        unrealisedRoePcnt: number;
        unrealisedPnlPcnt: number;
        settleCurrency: number;
    };
}
export interface KucoinPositionChangeByMarkPriceEvent {
    userId: string;
    topic: string;
    subject: string;
    data: {
        markPrice: number;
        markValue: number;
        maintMargin: number;
        realLeverage: number;
        unrealisedPnl: number;
        unrealisedRoePcnt: number;
        unrealisedPnlPcnt: number;
        delevPercentage: number;
        currentTimestamp: number;
        settleCurrency: string;
    };
}
export interface KucoinFundingSettlementEvent {
    userId: string;
    topic: string;
    subject: string;
    data: {
        fundingTime: number;
        qty: number;
        markPrice: number;
        fundingRate: number;
        fundingFee: number;
        ts: number;
        settleCurrency: string;
    };
}
export interface KucoinRiskLimitChangeEvent {
    userId: string;
    topic: string;
    subject: string;
    data: {
        success: boolean;
        riskLimitLevel: number;
        msg: string;
    };
}
//# sourceMappingURL=kucoin-websocket.types.d.ts.map