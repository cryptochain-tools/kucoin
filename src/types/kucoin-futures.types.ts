import { KucoinOrderSide, KucoinOrderTimeInForce, KucoinOrderType, KucoinStopOrderType } from "./kucoin.types";


// ---------------------------------------------------------------------------------------------------
//  MARKET
// ---------------------------------------------------------------------------------------------------

/// getActiveSymbols . getSymbolInformation

/** {@link https://docs.kucoin.com/futures/#get-order-info-of-the-contract Get Order Info of the Contract} */
export interface KucoinFuturesSymbolInformation {
  /** Contract status. */
  symbol: string;
  /** Contract group. */
  rootSymbol: string;
  /** Type of the contract. Ex: `FFWCSX` */
  type: string;
  /** First Open Date. */
  firstOpenDate: number;
  /** Expiration date. Null means it will never expire. */
  expireDate: number;
  /** Settlement date. Null indicates that automatic settlement is not supported. */
  settleDate: number;
  /** Base currency. */
  baseCurrency: string;
  /** Quote currency. */
  quoteCurrency: string;
  /** Currency used to clear and settle the trades. */
  settleCurrency: string;
  /** Maximum order quantity. */
  maxOrderQty: number;
  /** Maximum order price. */
  maxPrice: number;
  /** Minimum lot size. */
  lotSize: number;
  /** Minimum price changes. */
  tickSize: number;
  /** Index price of tick size. */
  indexPriceTickSize: number;
  /** Contract multiplier. */
  multiplier: number;
  /** Initial margin requirement. */
  initialMargin: number;
  /** Maintenance margin requirement. */
  maintainMargin: number;
  /** Maximum risk limit (unit: XBT). */
  maxRiskLimit: number;
  /** Minimum risk limit (unit: XBT). */
  minRiskLimit: number;
  /** Risk limit increment value (unit: XBT). */
  riskStep: number;
  /** Maker fees. */
  makerFeeRate: number;
  /** Taker fees. */
  takerFeeRate: number;
  /** Fixed taker fees(Deprecated field, no actual use of the value field). */
  takerFixFee: number;
  /** Fixed maker fees(Deprecated field, no actual use of the value field). */
  makerFixFee: number;
  /** settlement fee. */
  settlementFee: number;
  /** Enabled ADL or not. */
  isDeleverage: boolean;
  /** Whether quanto or not(Deprecated field, no actual use of the value field). */
  isQuanto: boolean;
  /** Reverse contract or not. */
  isInverse: boolean;
  /** Marking method. */
  markMethod: string;
  /** Fair price marking method. */
  fairMethod: string;
  /** Ticker symbol of the based currency. */
  fundingBaseSymbol: string;
  /** Ticker symbol of the quote currency. */
  fundingQuoteSymbol: string;
  /** Funding rate symbol. */
  fundingRateSymbol: string;
  /** Index symbol. */
  indexSymbol: string;
  /** Settlement Symbol. */
  settlementSymbol: string;
  /** Contract status. */
  status: string;
  /** Funding fee rate. */
  fundingFeeRate: number;
  /** Predicted funding fee rate. */
  predictedFundingFeeRate: number;
  /** open interest. */
  openInterest: number;
  /** turnover of 24 hours. */
  turnoverOf24h: number;
  /** volume of 24 hours. */
  volumeOf24h: number;
  /** Mark price. */
  markPrice: number;
  /** Index price. */
  indexPrice: number;
  /** last trade price. */
  lastTradePrice: number;
  /** next funding rate time. */
  nextFundingRateTime: number;
  /** maximum leverage. */
  maxLeverage: number;
  /** The contract index source exchange. Ex: `["huobi", "Okex", "Binance", "Kucoin", "Poloniex", "Hitbtc"]`. */
  sourceExchanges: string[];
  /** Premium index symbol (1 minute). */
  premiumsSymbol1M: string;
  /** Premium index symbol (8 hours). */
  premiumsSymbol8H: string;
  /** Base currency interest rate symbol (1 minute). */
  fundingBaseSymbol1M: string;
  /** Quote currency interest rate symbol (1 minute). */
  fundingQuoteSymbol1M: string;
  /** 24H Low. */
  lowPrice: number;
  /** 24H High. */
  highPrice: number;
  /** 24H Change%. */
  priceChgPct: number;
  /** 24H Change. */
  priceChg: number;
}

/// getSymbolPriceTicker . getPosition

/**
 * {@link https://docs.kucoin.com/futures/#get-real-time-ticker Get Ticker}
 * {@link https://docs.kucoin.com/futures/#get-position-details Get Position Details}
 */
export interface KucoinFuturesSymbolRequest {
  /** Symbol of the contract. */
  symbol: string;
}

/// getSymbolPriceTicker

/** {@link https://docs.kucoin.com/futures/#get-real-time-ticker Get Ticker} */
export interface KucoinFuturesSymbolPriceTicker {
  /** Sequence number. */
  sequence: number;
  /** Symbol. */
  symbol: string;
  /** Side of liquidity taker. */
  side: KucoinOrderSide;
  /** Filled quantity. */
  size: number;
  /** Filled price. */
  price: string;
  /** Best bid size. */
  bestBidSize: number;
  /** Best bid price. */
  bestBidPrice: string;
  /** Best ask size. */
  bestAskSize: number;
  /** Best ask price. */
  bestAskPrice: string;
  /** Transaction ID. */
  tradeId: string;
  /** Filled time - nanosecond. */
  ts: number;
}


// ---------------------------------------------------------------------------------------------------
//  ACCOUNT
// ---------------------------------------------------------------------------------------------------

/// getAccountOverview

/** {@link https://docs.kucoin.com/futures/#get-account-overview Get Account Overview} */
export interface KucoinFuturesAccountOverviewRequest {
  /** Currecny, including `XBT`,`USDT`,Default `XBT`. */
  currency?: string;
}

/** {@link https://docs.kucoin.com/futures/#get-account-overview Get Account Overview} */
export interface KucoinFuturesAccountOverview {
  /** Account equity = marginBalance + Unrealised PNL. */
  accountEquity: number;
  /** Unrealised profit and loss. */
  unrealisedPNL: number;
  /** Margin balance = positionMargin + orderMargin + frozenFunds + availableBalance - unrealisedPNL. */
  marginBalance: number;
  /** Position margin. */
  positionMargin: number;
  /** Order margin. */
  orderMargin: number;
  /** Frozen funds for withdrawal and out-transfer. */
  frozenFunds: number;
  /** Available balance. */
  availableBalance: number;
  /** currency code. */
  currency: string;
}

/// getPositions . getPosition

/** {@link https://docs.kucoin.com/futures/#get-position-list Get Position List} */
export interface KucoinFuturesPosition {
  /** Position ID. */
  id: string;
  /** Symbol. */
  symbol: string;
  /** Auto deposit margin or not. */
  autoDeposit: boolean;
  /** Maintenance margin requirement. */
  maintMarginReq: number;
  /** Risk limit. */
  riskLimit: number;
  /** Leverage o the order. */
  realLeverage: number;
  /** Cross mode or not. */
  crossMode: boolean;
  /** ADL ranking percentile. */
  delevPercentage: number;
  /** Open time. */
  openingTimestamp: number;
  /** Current timestamp. */
  currentTimestamp: number;
  /** Current postion quantity. */
  currentQty: number;
  /** Current postion value. */
  currentCost: number;
  /** Current commission. */
  currentComm: number;
  /** Unrealised value. */
  unrealisedCost: number;
  /** Accumulated realised gross profit value. */
  realisedGrossCost: number;
  /** Current realised position value. */
  realisedCost: number;
  /** Opened position or not. */
  isOpen: boolean;
  /** Mark price. */
  markPrice: number;
  /** Mark value. */
  markValue: number;
  /** Position value. */
  posCost: number;
  /** added margin. */
  posCross: number;
  /** Leverage margin. */
  posInit: number;
  /** Bankruptcy cost. */
  posComm: number;
  /** Funding fees paid out. */
  posLoss: number;
  /** Position margin. */
  posMargin: number;
  /** Maintenance margin. */
  posMaint: number;
  /** Position margin. */
  maintMargin: number;
  /** Accumulated realised gross profit value. */
  realisedGrossPnl: number;
  /** Realised profit and loss. */
  realisedPnl: number;
  /** Unrealised profit and loss. */
  unrealisedPnl: number;
  /** Profit-loss ratio of the position. */
  unrealisedPnlPcnt: number;
  /** Rate of return on investment. */
  unrealisedRoePcnt: number;
  /** Average entry price. */
  avgEntryPrice: number;
  /** Liquidation price. */
  liquidationPrice: number;
  /** Bankruptcy price. */
  bankruptPrice: number;
  /** Currency used to clear and settle the trades. */
  settleCurrency: number;
  /** Maintenance margin requirement. */
  maintainMargin: number;
  /** Reverse contract or not. */
  isInverse?: boolean;
  /** Risk Limit Level. */
  riskLimitLevel?: number;
}

/// getRiskLimitLevel

/** {@link https://docs.kucoin.com/futures/#risk-limit-level Risk Limit Level} */
export interface KucoinFuturesRiskLimit {
  /** Path parameter. Symbol of the contract. */
  symbol: string;
  /** level. */
  level: number;
  /** Upper limit (includes). */
  maxRiskLimit: number;
  /** Lower limit. */
  minRiskLimit: number;
  /** Max leverage. */
  maxLeverage: number;
  /** Initial margin rate. */
  initialMargin: number;
  /** Maintenance margin rate. */
  maintainMargin: number;
}


// ---------------------------------------------------------------------------------------------------
//  ORDERS
// ---------------------------------------------------------------------------------------------------

/// getOrders

/** {@link https://docs.kucoin.com/futures/#get-order-list Get Order List} */
export interface KucoinFuturesGetOrdersRequest {
  /** `active` or `done`, done as default. Only list orders for a specific status. */
  status?: 'active' | 'done';
  /** Symbol of the contract. */
  symbol?: string;
  /** `buy` or `sell`. */
  side?: KucoinOrderSide;
  /** `limit`, `market`, `limit_stop` or `market_stop`. */
  type?: KucoinOrderType;
  /** Start time (milisecond). */
  startAt?: number;
  /** End time (milisecond). */
  endAt?: number;
}

/** {@link https://docs.kucoin.com/futures/#get-order-list Get Order List} */
export interface KucoinFuturesGetOrdersResponse {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: KucoinFuturesOrder[];
}

/// getOrder

/** {@link https://docs.kucoin.com/futures/#get-details-of-a-single-order Get Details of a Single Order} */
export interface KucoinFuturesGetOrderRequest {
  /** Client order id. */
  clientOid: string;
}

/**
 * {@link https://docs.kucoin.com/futures/#get-details-of-a-single-order Get Details of a Single Order}
 * {@link https://docs.kucoin.com/futures/#get-order-list Get Order List}
 */
export interface KucoinFuturesOrder {
  /** Order ID. */
  id: string;
  /** Symbol of the contract. */
  symbol: string;
  /** Order type, market order or limit order. */
  type: KucoinOrderType;
  /** Transaction side. */
  side: KucoinOrderSide;
  /** Order price. */
  price: string;
  /** Order quantity. */
  size: number;
  /** Order value. */
  value: string;
  /** Executed size of funds. */
  dealValue: string;
  /** Executed quantity. */
  dealSize: number;
  /** Self trade prevention types. */
  stp: string;
  /** Stop order type (stop limit or stop market). */
  stop: string;
  /** Trigger price type of stop orders. */
  stopPriceType: string;
  /** Mark to show whether the stop order is triggered. */
  stopTriggered: boolean;
  /** Trigger price of stop orders. */
  stopPrice: number;
  /** Time in force policy type. */
  timeInForce: KucoinOrderTimeInForce;
  /** Mark of post only. */
  postOnly: boolean;
  /** Mark of the hidden order. */
  hidden: boolean;
  /** Mark of the iceberg order. */
  iceberg: boolean;
  /** Leverage of the order. */
  leverage: string;
  /** A mark to forcely hold the funds for an order. */
  forceHold: boolean;
  /** A mark to close the position. */
  closeOrder: boolean;
  /** Visible size of the iceberg order. */
  visibleSize: number;
  /** Unique order id created by users to identify their orders. */
  clientOid: string;
  /** Remark of the order. */
  remark: string;
  /** tag order source. */
  tags: string;
  /** Mark of the active orders. */
  isActive: boolean;
  /** Mark of the canceled orders. */
  cancelExist: boolean;
  /** Time the order created. */
  createdAt: number;
  /** last update time. */
  updatedAt: number;
  /** End time. */
  endAt: number;
  /** Order create time in nanosecond. */
  orderTime: number;
  /** settlement currency. */
  settleCurrency: string;
  /** order status: “open” or “done”. */
  status: string;
  /** Value of the executed orders. */
  filledSize: string;
  /** Executed order quantity. */
  filledValue: number;
  /** A mark to reduce the position size only. */
  reduceOnly: boolean;
}

/// getFills . getRecentFills

/** {@link https://docs.kucoin.com/#list-fills List Fills} */
export interface KucoinFuturesGetFillsRequest {
  /** Limit the list of fills to this orderId（If you specify orderId, ignore other conditions）. */
  orderId?: string;
  /** Limit the list of fills to this symbol. */
  symbol?: string;
  /** buy or sell. */
  side?: KucoinOrderSide;
  /** limit, market, limit_stop or market_stop. */
  type?: KucoinOrderType;
  /** Start time (milisecond). */
  startAt?: number;
  /** End time (milisecond). */
  endAt?: number;
}

/** {@link https://docs.kucoin.com/#list-fills List Fills} */
export interface KucoinFuturesGetFillsResponse{
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: KucoinFuturesOrderFilled[];
}

/**
 * {@link https://docs.kucoin.com/#list-fills List Fills}
 * {@link https://docs.kucoin.com/#recent-fills Recent Fills}
 */
 export interface KucoinFuturesOrderFilled {
  /** Symbol of the contract. */
  symbol: string;
  /** Trade ID. */
  tradeId: string;
  /** Order ID. */
  orderId: string;
  /** Transaction side. */
  side: KucoinOrderSide;
  /** Liquidity- taker or maker. */
  liquidity: string;
  /** Whether to force processing as a taker. */
  forceTaker: boolean;
  /** Filled price. */
  price: string;
  /** Filled amount. */
  size: number;
  /** Order value. */
  value: string;
  /** Floating fees. */
  feeRate: string;
  /** Fixed fees(Deprecated field, no actual use of the value field). */
  fixFee: string;
  /** Charging currency. */
  feeCurrency: string;
  /** A mark to the stop order type. */
  stop: string;
  /** Transaction fee. */
  fee: string;
  /** Order type. */
  orderType: KucoinOrderType;
  /** Trade type (trade, liquidation, ADL or settlement). */
  tradeType: string;
  /** Time the order created. */
  createdAt: number;
  /** Transaction fee. */
  settleCurrency: string;
  /** trade time in nanosecond. */
  tradeTime: number;
}

/// postOrder

/** {@link https://docs.kucoin.com/futures/#place-an-order Place an Order} */
export interface KucoinFuturesPostOrderRequest {
  /** Unique order id created by users to identify their orders, e.g. UUID, Only allows numbers, characters, underline(_), and separator(-). */
  clientOid: string;
  /** `buy` or `sell`. */
  side: KucoinOrderSide;
  /** a valid contract code. e.g. XBTUSDM. */
  symbol: string;
  /** Either `limit` or `market`. */
  type?: KucoinOrderType;
  /** Leverage of the order. */
  leverage: string;
  /** remark for the order, length cannot exceed 100 utf8 characters. */
  remark?: string;
  /** Either `down` or `up`. Requires stopPrice and stopPriceType to be defined. */
  stop?: KucoinStopOrderType;
  /** Either `TP`, `IP` or `MP`, Need to be defined if stop is specified. */
  stopPriceType?: string;
  /** Need to be defined if stop is specified. */
  stopPrice?: string;
  /** A mark to reduce the position size only. Set to false by default. Need to set the position size when reduceOnly is true. */
  reduceOnly?: boolean;
  /** A mark to close the position. Set to false by default. It will close all the positions when closeOrder is true. */
  closeOrder?: boolean;
  /** A mark to forcely hold the funds for an order, even though it's an order to reduce the position size. This helps the order stay on the order book and not get canceled when the position size changes. Set to false by default. */
  forceHold?: boolean;
  // LIMIT ORDER PARAMETERS
  /** Limit price. */
  price: string;
  /** Order size. Must be a positive number. */
  size: number;
  /** GTC, IOC(default is GTC), read Time In Force. */
  timeInForce?: KucoinOrderTimeInForce;
  /** Post only flag, invalid when timeInForce is IOC. When postOnly chose, not allowed choose hidden or iceberg. */
  postOnly?: boolean;
  /** Orders not displaying in order book. When hidden chose, not allowed choose postOnly. */
  hidden?: boolean;
  /** Only visible portion of the order is displayed in the order book. When iceberg chose, not allowed choose postOnly. */
  iceberg?: boolean;
  /** The maximum visible size of an iceberg order  . */
  visibleSize?: number;
}

/** {@link https://docs.kucoin.com/futures/#place-an-order Place an Order} */
export interface KucoinFuturesOrderResponse {
  /** The ID of the order. Ex: `'5bd6e9286d99522a52e458de'`. */
  orderId: string;
}

/// cancelOrder . cancelAllSymbolOrders

/** {@link https://docs.kucoin.com/futures/#cancel-an-order Cancel an Order} */
export interface KucoinFuturesCancelOrdersResponse {
  /** Array of cancelled order ids. */
  cancelledOrderIds: string[];
}

/// cancelAllSymbolOrders

/** {@link https://docs.kucoin.com/futures/#limit-order-mass-cancelation Limit Order Mass Cancelation} */
export interface KucoinFuturesCancelAllSymbolOrdersRequest {
  /** Cancel all limit orders for a specific contract only. */
  symbol?: string;
}
