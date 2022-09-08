import { KucoinOrderSide, KucoinOrderType, KucoinTradeType } from "./kucoin.types";


// ---------------------------------------------------------------------------------------------------
//  MARKET
// ---------------------------------------------------------------------------------------------------

/// getSymbolsList

/** {@link https://docs.kucoin.com/#get-symbols-list Get Symbols List} */
export interface KucoinSpotSymbolsInformationRequest {
  /** The trading market. */
  market?: string;
}

/** {@link https://docs.kucoin.com/#get-symbols-list Get Symbols List} */
export interface KucoinSpotSymbolInformation {
  /** Unique code of a symbol, it would not change after renaming. Ex: `'XLM-USDT'`. */
  symbol: string;
  /** Name of trading pairs, it would change after renaming. Ex: `'XLM-USDT'`. */
  name: string;
  /** Base currency,e.g. BTC. Ex: `'XLM'`. */
  baseCurrency: string;
  /** Quote currency,e.g. USDT. Ex: `'USDT'`. */
  quoteCurrency: string;
  /** The trading market. Ex: `'USDT'`. */
  market: string;
  /** The minimum order quantity requried to place an order. Ex: `'USDS'`. */
  baseMinSize: string;
  /** The minimum order funds required to place a market order. Ex: `'0.1'`. */
  quoteMinSize: string;
  /** The maximum order size required to place an order. Ex: `'0.01'`. */
  baseMaxSize: string;
  /** The maximum order funds required to place a market order. Ex: `'10000000000'`. */
  quoteMaxSize: string;
  /** The increment of the order size. The value shall be a positive multiple of the baseIncrement. Ex: `'99999999'`. */
  baseIncrement: string;
  /** The increment of the funds required to place a market order. The value shall be a positive multiple of the quoteIncrement. Ex: `'0.0001'`. */
  quoteIncrement: string;
  /** The increment of the price required to place a limit order. The value shall be a positive multiple of the priceIncrement. Ex: `'0.000001'`. */
  priceIncrement: string;
  /** The currency of charged fees. Ex: `'0.000001'`. */
  feeCurrency: string;
  /** Available for transaction or not. Ex: `'0.1'`. */
  enableTrading: string;
  /** Available for margin or not. */
  isMarginEnabled: boolean;
  /** Threshold for price portection. */
  priceLimitRate: boolean;
}

/// getSymbolKlines

export type KucoinSpotSymbolKlineType = '1min' | '3min' | '5min' | '15min' | '30min' |
  '1hour' | '2hour' | '4hour' | '6hour' | '8hour' | '12hour' | '1day' | '1week';

/** {@link https://docs.kucoin.com/#get-klines Get Klines} */
export interface KucoinSpotSymbolKlinesRequest {
  symbol: string;
  startAt?: string;
  endAt?: string;
  type: KucoinSpotSymbolKlineType;
}

/** {@link https://docs.kucoin.com/#get-klines Get Klines} */
export interface KucoinSpotSymbolKline {
  /** Start time of the candle cycle. Ex: `'1545904920'`. */
  time: string;
  /** Opening price. Ex: `'0.058'`. */
  open: string;
  /** Closing price. Ex: `'0.072'`. */
  close: string;
  /** Highest price. Ex: `'0.072'`. */
  high: string;
  /** Lowest price. Ex: `'0.058'`. */
  low: string;
  /** Transaction volume. Ex: `'0.103'`. */
  volume: string;
  /** Transaction amount. Ex: `'0.006986'`. */
  turnover: string;
}


// ---------------------------------------------------------------------------------------------------
//  ACCOUNT
// ---------------------------------------------------------------------------------------------------

/** {@link https://docs.kucoin.com/#list-accounts List Accounts} */
export type KucoinSpotAccountType = 'main' | 'trade' | 'margin';

/// getUserInfo

/** {@link https://docs.kucoin.com/#get-user-info-of-all-sub-accounts Get User Info of all Sub-Accounts} */
export interface KucoinSpotUserInfo {
  /** The user ID of your sub-account. */
  userId: string;
  /** The username of your sub-account. */
  subName: string;
  /** The type of your sub-account. Ex: 0=normal*/
  type: number;
  /** Remark. */
  remarks: string;
}

/// getAccountsList

/** {@link https://docs.kucoin.com/#list-accounts List Accounts} */
export interface KucoinSpotListAccountsRequest {
  /** Currency. Ex: `'BTC'`. */
  currency?: string;
  /** Account type, including main and trade. Ex: `'main'`. */
  type?: KucoinSpotAccountType;
}

/** {@link https://docs.kucoin.com/#list-accounts List Accounts} */
export interface KucoinSpotListAccount {
  /** accountId. Ex: `'5bd6e9286d99522a52e458de'`. */
  id: string;
  /** Currency. Ex: `'BTC'`. */
  currency: string;
  /** Account type, including main and trade. Ex: `'main'`. */
  type: KucoinSpotAccountType;
  /** Total assets of a currency. Ex: `'237582.04299'`. */
  balance: string;
  /** Available assets of a currency. Ex: `'237582.032'`. */
  available: string;
  /** Hold assets of a currency. Ex: `'0.01099'`. */
  holds: string;
}

/// getAccountInformation

/** {@link https://docs.kucoin.com/#get-an-account Get an Account} */
export interface KucoinSpotAccountInformation {
  /** Currency. Ex: `'BTC'`. */
  currency: string;
  /** Total assets of a currency. Ex: `'237582.04299'`. */
  balance: string;
  /** Available assets of a currency. Ex: `'237582.032'`. */
  available: string;
  /** Hold assets of a currency. Ex: `'0.01099'`. */
  holds: string;
}

/// postAccount

/** {@link https://docs.kucoin.com/#create-an-account Create an Account} */
export interface KucoinSpotCreateAccountRequest {
  /** Currency. Ex: `'BTC'`. */
  currency: string;
  /** Account type, including main and trade. Ex: `'main'`. */
  type: KucoinSpotAccountType;
}

/** {@link https://docs.kucoin.com/#create-an-account Create an Account} */
export interface KucoinSpotCreateAccountResponse {
  /** accountId. Ex: `'5bd6e9286d99522a52e458de'`. */
  id: string;
}

/// getAccountBalance

/** {@link https://docs.kucoin.com/#get-account-balance-of-a-sub-account Get Account Balance of a Sub-Account} */
export interface KucoinSpotAccountBalanceResponse {
  /** The user ID of a sub-user. */
  subUserId: string;
  /** The username of a sub-user. */
  subName: string;
  /** Main account balances. */
  mainAccounts: KucoinSpotAccountBalance[];
  /** Trade account balances. */
  tradeAccounts: KucoinSpotAccountBalance[];
  /** Margin account balances. */
  marginAccounts: KucoinSpotAccountBalance[];
}

/** {@link https://docs.kucoin.com/#get-account-balance-of-a-sub-account Get Account Balance of a Sub-Account} */
export interface KucoinSpotAccountBalance {
  /** Currency. */
  currency: string;
  /** Total funds in an account. */
  balance: string;
  /** Funds available to withdraw or trade. */
  available: string;
  /** Funds on hold (not available for use). */
  holds: string;
  /** Calculated on this currency. */
  baseCurrency: string;
  /** The base currency price. */
  baseCurrencyPrice: string;
  /** The base currency amount. */
  baseAmount: string;
}


// ---------------------------------------------------------------------------------------------------
//  ORDERS
// ---------------------------------------------------------------------------------------------------

/// getOrders . getRecentOrders

/** {@link https://docs.kucoin.com/#list-orders List Orders} */
export interface KucoinSpotGetOrdersRequest {
  /** `active` or `done` (done as default), Only list orders with a specific status. */
  status?: string;
  /** Only list orders for a specific symbol. */
  symbol?: string;
  /** `buy` or `sell`. */
  side?: KucoinOrderSide;
  /** `limit`, `market`, `limit_stop` or `market_stop`. */
  type?: KucoinOrderType;
  /** The type of trading : TRADE（Spot Trading）, MARGIN_TRADE (Margin Trading). */
  tradeType: KucoinTradeType;
  /** Start time (milisecond). */
  startAt?: number;
  /** End time (milisecond). */
  endAt?: number;
}

/** {@link https://docs.kucoin.com/#list-orders List Orders} */
export interface KucoinSpotOrderResponse {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: KucoinSpotOrder[];
}

/**
 * {@link https://docs.kucoin.com/#get-an-order Get an order}
 * {@link https://docs.kucoin.com/#list-orders List Orders}
 */
export interface KucoinSpotOrder {
  /** Order ID, the ID of an order. */
  id: string;
  /** symbol. */
  symbol: string;
  /** Operation type: DEAL. */
  opType: string;
  /** order type,e.g. `limit`,`market`,`stop_limit`. */
  type: KucoinOrderType;
  /** Transaction direction,include buy and sell. */
  side: KucoinOrderSide;
  /** order price. */
  price: string;
  /** order quantity. */
  size: string;
  /** order funds. */
  funds: string;
  /** executed size of funds. */
  dealFunds: string;
  /** executed quantity. */
  dealSize: string;
  /** fee. */
  fee: string;
  /** charge fee currency. */
  feeCurrency: string;
  /** self trade prevention,include CN,CO,DC,CB. */
  stp: string;
  /** stop type, include entry and loss. */
  stop: string;
  /** stop order is triggered or not. */
  stopTriggered: boolean;
  /** stop price. */
  stopPrice: string;
  /** time InForce,include GTC,GTT,IOC,FOK. */
  timeInForce: string;
  /** postOnly. */
  postOnly: boolean;
  /** hidden order. */
  hidden: boolean;
  /** iceberg order. */
  iceberg: boolean;
  /** displayed quantity for iceberg order. */
  visibleSize: string;
  /** cancel orders time，requires timeInForce to be GTT. */
  cancelAfter: number;
  /** order source. */
  channel: string;
  /** user-entered order unique mark. */
  clientOid: string;
  /** remark. */
  remark: string;
  /** tag order source. */
  tags: string;
  /** order status, true and false. If true, the order is active, if false, the order is fillled or cancelled. */
  isActive: boolean;
  /** order cancellation transaction record. */
  cancelExist: boolean;
  /** create time. */
  createdAt: number;
  /** The type of trading : TRADE（Spot Trading）, MARGIN_TRADE (Margin Trading). */
  tradeType: KucoinTradeType;
}

/// getFills . getRecentFills

/** {@link https://docs.kucoin.com/#list-fills List Fills} */
export interface KucoinSpotGetFillsRequest {
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
  /** The type of trading : TRADE（Spot Trading）, MARGIN_TRADE (Margin Trading). */
  tradeType: KucoinTradeType;
}

/** {@link https://docs.kucoin.com/#list-fills List Fills} */
export interface KucoinSpotGetFillsResponse{
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: KucoinSpotOrderFilled[];
}

/**
 * {@link https://docs.kucoin.com/#list-fills List Fills}
 * {@link https://docs.kucoin.com/#recent-fills Recent Fills}
 */
export interface KucoinSpotOrderFilled {
  /** symbol. */
  symbol: string;
  /** trade id, it is generated by Matching engine. */
  tradeId: string;
  /** Order ID, unique identifier of an order. */
  orderId: string;
  /** counter order id. */
  counterOrderId: string;
  /** order type,e.g. `limit`,`market`,`stop_limit`. */
  type: KucoinOrderType;
  /** transaction direction,include buy and sell. */
  side: KucoinOrderSide;
  /** order price. */
  price: string;
  /** order quantity. */
  size: string;
  /** order funds. */
  funds: string;
  /** fee. */
  fee: string;
  /** charge fee currency. */
  feeCurrency: string;
  /** stop type, include entry and loss. */
  stop: string;
  /** include `taker` and `maker`. */
  liquidity: string;
  /** forced to become taker, include true and false. */
  forceTaker: boolean;
  /** create time. */
  createdAt: number;
  /** The type of trading : TRADE（Spot Trading）, MARGIN_TRADE (Margin Trading). */
  tradeType: KucoinTradeType;
}

/// postOrder

/** {@link https://docs.kucoin.com/#place-a-new-order Place a new order} */
export interface KucoinSpotPostOrderRequest {
  /** Unique order id created by users to identify their orders, e.g. UUID. */
  clientOid: string;
  /** buy or sell */
  side: KucoinOrderSide;
  /** a valid trading symbol code. e.g. ETH-BTC */
  symbol: string;
  /** `limit` or `market` (default is limit) */
  type?: KucoinOrderType;
  /** remark for the order, length cannot exceed 100 utf8 characters */
  remark?: string;
  /** self trade prevention , `CN`, `CO`, `CB` or `DC` */
  stp?: string;
  /** The type of trading : TRADE（Spot Trade）, MARGIN_TRADE (Margin Trade). Default is TRADE. */
  tradeType?: KucoinTradeType;
  // LIMIT ORDER PARAMETERS
  /**	price per base currency. */
  price: string;
  /**	amount of base currency to buy or sell. */
  size: string;
  /**	GTC, GTT, IOC, or FOK (default is GTC), read Time In Force. */
  timeInForce?: string;
  /**	cancel after n seconds, requires timeInForce to be GTT. */
  cancelAfter?: number;
  /**	Post only flag, invalid when timeInForce is IOC or FOK. */
  postOnly?: boolean;
  /**	Order will not be displayed in the order book. */
  hidden?: boolean;
  /**	Only aportion of the order is displayed in the order book. */
  iceberg?: boolean;
  /**	The maximum visible size of an iceberg order. */
  visibleSize?: string;
  // MARKET ORDER PARAMETERS
  /** The desired amount of quote currency to use. */
  funds?: string;
}

/// postOrder . cancelOrder

/**
 * {@link https://docs.kucoin.com/#place-a-new-order Place a new order}
 * {@link https://docs.kucoin.com/#cancel-all-orders Cancel all orders}
 */
export interface KucoinSpotOrderIdResponse {
  /** The ID of the order. Ex: `'5bd6e9286d99522a52e458de'`. */
  orderId: string;
}

/// cancelAllSymbolOrders

/** {@link https://docs.kucoin.com/#cancel-all-orders Cancel all orders} */
export interface KucoinSpotCancelAllSymbolOrdersRequest {
  /** Symbol, cancel the orders for the specified trade pair. */
  symbol?: string;
  /** The type of trading : TRADE（Spot Trade）, MARGIN_TRADE (Margin Trade). Default is TRADE. */
  tradeType: KucoinTradeType;
}

/** {@link https://docs.kucoin.com/#cancel-all-orders Cancel all orders} */
export interface KucoinSpotCancelAllSymbolOrdersResponse {
  /** Array of cancelled order ids. */
  cancelledOrderIds: string[];
}
