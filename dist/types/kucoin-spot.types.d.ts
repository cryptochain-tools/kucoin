import { KucoinOrderSide, KucoinOrderType, KucoinTradeType } from "./kucoin.types";
export interface KucoinSpotSymbolsInformationRequest {
    market?: string;
}
export interface KucoinSpotSymbolInformation {
    symbol: string;
    name: string;
    baseCurrency: string;
    quoteCurrency: string;
    market: string;
    baseMinSize: string;
    quoteMinSize: string;
    baseMaxSize: string;
    quoteMaxSize: string;
    baseIncrement: string;
    quoteIncrement: string;
    priceIncrement: string;
    feeCurrency: string;
    enableTrading: string;
    isMarginEnabled: boolean;
    priceLimitRate: boolean;
}
export declare type KucoinSpotSymbolKlineType = '1min' | '3min' | '5min' | '15min' | '30min' | '1hour' | '2hour' | '4hour' | '6hour' | '8hour' | '12hour' | '1day' | '1week';
export interface KucoinSpotSymbolKlinesRequest {
    symbol: string;
    startAt?: string;
    endAt?: string;
    type: KucoinSpotSymbolKlineType;
}
export interface KucoinSpotSymbolKline {
    time: string;
    open: string;
    close: string;
    high: string;
    low: string;
    volume: string;
    turnover: string;
}
export declare type KucoinSpotAccountType = 'main' | 'trade' | 'margin';
export interface KucoinSpotUserInfo {
    userId: string;
    subName: string;
    type: number;
    remarks: string;
}
export interface KucoinSpotListAccountsRequest {
    currency?: string;
    type?: KucoinSpotAccountType;
}
export interface KucoinSpotListAccount {
    id: string;
    currency: string;
    type: KucoinSpotAccountType;
    balance: string;
    available: string;
    holds: string;
}
export interface KucoinSpotAccountInformation {
    currency: string;
    balance: string;
    available: string;
    holds: string;
}
export interface KucoinSpotCreateAccountRequest {
    currency: string;
    type: KucoinSpotAccountType;
}
export interface KucoinSpotCreateAccountResponse {
    id: string;
}
export interface KucoinSpotAccountBalanceResponse {
    subUserId: string;
    subName: string;
    mainAccounts: KucoinSpotAccountBalance[];
    tradeAccounts: KucoinSpotAccountBalance[];
    marginAccounts: KucoinSpotAccountBalance[];
}
export interface KucoinSpotAccountBalance {
    currency: string;
    balance: string;
    available: string;
    holds: string;
    baseCurrency: string;
    baseCurrencyPrice: string;
    baseAmount: string;
}
export interface KucoinSpotGetOrdersRequest {
    status?: string;
    symbol?: string;
    side?: KucoinOrderSide;
    type?: KucoinOrderType;
    tradeType: KucoinTradeType;
    startAt?: number;
    endAt?: number;
}
export interface KucoinSpotOrderResponse {
    currentPage: number;
    pageSize: number;
    totalNum: number;
    totalPage: number;
    items: KucoinSpotOrder[];
}
export interface KucoinSpotOrder {
    id: string;
    symbol: string;
    opType: string;
    type: KucoinOrderType;
    side: KucoinOrderSide;
    price: string;
    size: string;
    funds: string;
    dealFunds: string;
    dealSize: string;
    fee: string;
    feeCurrency: string;
    stp: string;
    stop: string;
    stopTriggered: boolean;
    stopPrice: string;
    timeInForce: string;
    postOnly: boolean;
    hidden: boolean;
    iceberg: boolean;
    visibleSize: string;
    cancelAfter: number;
    channel: string;
    clientOid: string;
    remark: string;
    tags: string;
    isActive: boolean;
    cancelExist: boolean;
    createdAt: number;
    tradeType: KucoinTradeType;
}
export interface KucoinSpotOrderFilled {
    symbol: string;
    tradeId: string;
    orderId: string;
    counterOrderId: string;
    type: KucoinOrderType;
    side: KucoinOrderSide;
    price: string;
    size: string;
    funds: string;
    fee: string;
    feeCurrency: string;
    stop: string;
    liquidity: string;
    forceTaker: boolean;
    createdAt: number;
    tradeType: KucoinTradeType;
}
export interface KucoinSpotGetFillsRequest {
    orderId?: string;
    symbol?: string;
    side?: KucoinOrderSide;
    type?: KucoinOrderType;
    startAt?: number;
    endAt?: number;
    tradeType: KucoinTradeType;
}
export interface KucoinSpotGetFillsResponse {
    currentPage: number;
    pageSize: number;
    totalNum: number;
    totalPage: number;
    items: KucoinSpotOrderFilled[];
}
export interface KucoinSpotPostOrderRequest {
    clientOid: string;
    side: KucoinOrderSide;
    symbol: string;
    type?: string;
    remark?: string;
    stp?: string;
    tradeType?: KucoinTradeType;
    price: string;
    size: string;
    timeInForce?: string;
    cancelAfter?: number;
    postOnly?: boolean;
    hidden?: boolean;
    iceberg?: boolean;
    visibleSize?: string;
    funds?: string;
}
export interface KucoinSpotOrderResponse {
    orderId: string;
}
export interface KucoinSpotCancelAllSymbolOrdersRequest {
    symbol?: string;
    tradeType: KucoinTradeType;
}
export interface KucoinSpotCancelAllSymbolOrdersResponse {
    cancelledOrderIds: string[];
}
//# sourceMappingURL=kucoin-spot.types.d.ts.map