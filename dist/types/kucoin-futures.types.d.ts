import { KucoinOrderSide, KucoinOrderTimeInForce, KucoinOrderType, KucoinStopOrderType } from "./kucoin.types";
export interface KucoinFuturesSymbolInformation {
    symbol: string;
    rootSymbol: string;
    type: string;
    firstOpenDate: number;
    expireDate: number;
    settleDate: number;
    baseCurrency: string;
    quoteCurrency: string;
    settleCurrency: string;
    maxOrderQty: number;
    maxPrice: number;
    lotSize: number;
    tickSize: number;
    indexPriceTickSize: number;
    multiplier: number;
    initialMargin: number;
    maintainMargin: number;
    maxRiskLimit: number;
    minRiskLimit: number;
    riskStep: number;
    makerFeeRate: number;
    takerFeeRate: number;
    takerFixFee: number;
    makerFixFee: number;
    settlementFee: number;
    isDeleverage: boolean;
    isQuanto: boolean;
    isInverse: boolean;
    markMethod: string;
    fairMethod: string;
    fundingBaseSymbol: string;
    fundingQuoteSymbol: string;
    fundingRateSymbol: string;
    indexSymbol: string;
    settlementSymbol: string;
    status: string;
    fundingFeeRate: number;
    predictedFundingFeeRate: number;
    openInterest: number;
    turnoverOf24h: number;
    volumeOf24h: number;
    markPrice: number;
    indexPrice: number;
    lastTradePrice: number;
    nextFundingRateTime: number;
    maxLeverage: number;
    sourceExchanges: string[];
    premiumsSymbol1M: string;
    premiumsSymbol8H: string;
    fundingBaseSymbol1M: string;
    fundingQuoteSymbol1M: string;
    lowPrice: number;
    highPrice: number;
    priceChgPct: number;
    priceChg: number;
}
export interface KucoinFuturesSymbolRequest {
    symbol: string;
}
export interface KucoinFuturesSymbolPriceTicker {
    sequence: number;
    symbol: string;
    side: KucoinOrderSide;
    size: number;
    price: string;
    bestBidSize: number;
    bestBidPrice: string;
    bestAskSize: number;
    bestAskPrice: string;
    tradeId: string;
    ts: number;
}
export interface KucoinFuturesAccountOverviewRequest {
    currency?: string;
}
export interface KucoinFuturesAccountOverview {
    accountEquity: number;
    unrealisedPNL: number;
    marginBalance: number;
    positionMargin: number;
    orderMargin: number;
    frozenFunds: number;
    availableBalance: number;
    currency: string;
}
export interface KucoinFuturesPosition {
    id: string;
    symbol: string;
    autoDeposit: boolean;
    maintMarginReq: number;
    riskLimit: number;
    realLeverage: number;
    crossMode: boolean;
    delevPercentage: number;
    openingTimestamp: number;
    currentTimestamp: number;
    currentQty: number;
    currentCost: number;
    currentComm: number;
    unrealisedCost: number;
    realisedGrossCost: number;
    realisedCost: number;
    isOpen: boolean;
    markPrice: number;
    markValue: number;
    posCost: number;
    posCross: number;
    posInit: number;
    posComm: number;
    posLoss: number;
    posMargin: number;
    posMaint: number;
    maintMargin: number;
    realisedGrossPnl: number;
    realisedPnl: number;
    unrealisedPnl: number;
    unrealisedPnlPcnt: number;
    unrealisedRoePcnt: number;
    avgEntryPrice: number;
    liquidationPrice: number;
    bankruptPrice: number;
    settleCurrency: number;
    maintainMargin: number;
    isInverse?: boolean;
    riskLimitLevel?: number;
}
export interface KucoinFuturesRiskLimit {
    symbol: string;
    level: number;
    maxRiskLimit: number;
    minRiskLimit: number;
    maxLeverage: number;
    initialMargin: number;
    maintainMargin: number;
}
export interface KucoinFuturesGetOrdersRequest {
    status?: 'active' | 'done';
    symbol?: string;
    side?: KucoinOrderSide;
    type?: KucoinOrderType;
    startAt?: number;
    endAt?: number;
}
export interface KucoinFuturesGetOrdersResponse {
    currentPage: number;
    pageSize: number;
    totalNum: number;
    totalPage: number;
    items: KucoinFuturesOrder[];
}
export interface KucoinFuturesGetOrderRequest {
    clientOid: string;
}
export interface KucoinFuturesOrder {
    id: string;
    symbol: string;
    type: string;
    side: string;
    price: string;
    size: number;
    value: string;
    dealValue: string;
    dealSize: number;
    stp: string;
    stop: string;
    stopPriceType: string;
    stopTriggered: boolean;
    stopPrice: number;
    timeInForce: KucoinOrderTimeInForce;
    postOnly: boolean;
    hidden: boolean;
    iceberg: boolean;
    leverage: string;
    forceHold: boolean;
    closeOrder: boolean;
    visibleSize: number;
    clientOid: string;
    remark: string;
    tags: string;
    isActive: boolean;
    cancelExist: boolean;
    createdAt: number;
    updatedAt: number;
    endAt: number;
    orderTime: number;
    settleCurrency: string;
    status: string;
    filledSize: string;
    filledValue: number;
    reduceOnly: boolean;
}
export interface KucoinFuturesOrderFilled {
    symbol: string;
    tradeId: string;
    orderId: string;
    side: KucoinOrderSide;
    liquidity: string;
    forceTaker: boolean;
    price: string;
    size: number;
    value: string;
    feeRate: string;
    fixFee: string;
    feeCurrency: string;
    stop: string;
    fee: string;
    orderType: KucoinOrderType;
    tradeType: string;
    createdAt: number;
    settleCurrency: string;
    tradeTime: number;
}
export interface KucoinFuturesGetFillsRequest {
    orderId?: string;
    symbol?: string;
    side?: KucoinOrderSide;
    type?: KucoinOrderType;
    startAt?: number;
    endAt?: number;
}
export interface KucoinFuturesGetFillsResponse {
    currentPage: number;
    pageSize: number;
    totalNum: number;
    totalPage: number;
    items: KucoinFuturesOrderFilled[];
}
export interface KucoinFuturesPostOrderRequest {
    clientOid: string;
    side: KucoinOrderSide;
    symbol: string;
    type?: KucoinOrderType;
    leverage: string;
    remark?: string;
    stop?: KucoinStopOrderType;
    stopPriceType?: string;
    stopPrice?: string;
    reduceOnly?: boolean;
    closeOrder?: boolean;
    forceHold?: boolean;
    price: string;
    size: number;
    timeInForce?: KucoinOrderTimeInForce;
    postOnly?: boolean;
    hidden?: boolean;
    iceberg?: boolean;
    visibleSize?: number;
}
export interface KucoinFuturesOrderResponse {
    orderId: string;
}
export interface KucoinFuturesCancelOrdersResponse {
    cancelledOrderIds: string[];
}
export interface KucoinFuturesCancelAllSymbolOrdersRequest {
    symbol?: string;
}
//# sourceMappingURL=kucoin-futures.types.d.ts.map