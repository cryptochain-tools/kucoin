import { KucoinApi } from "./kucoin-api";
import { KucoinApiOptions, KucoinMarketType } from "./types/kucoin.types";
import {
  KucoinSpotListAccountsRequest,
  KucoinSpotListAccount,
  KucoinSpotCreateAccountRequest,
  KucoinSpotCreateAccountResponse,
  KucoinSpotAccountInformation,
  KucoinSpotSymbolInformation,
  KucoinSpotSymbolsInformationRequest,
  KucoinSpotSymbolKlinesRequest,
  KucoinSpotSymbolKline,
  KucoinSpotOrderResponse,
  KucoinSpotPostOrderRequest,
  KucoinSpotGetOrdersRequest,
  KucoinSpotOrder,
  KucoinSpotCancelAllSymbolOrdersRequest,
  KucoinSpotCancelAllSymbolOrdersResponse,
  KucoinSpotAccountBalanceResponse,
  KucoinSpotUserInfo,
  KucoinSpotGetFillsRequest,
  KucoinSpotGetFillsResponse,
  KucoinSpotOrderFilled,
} from './types/kucoin-spot.types';


export class KucoinApiSpot extends KucoinApi {
    
  market: KucoinMarketType = 'spot';

  constructor(
    options?: KucoinApiOptions,
  ) {
    super(options);
  }

  /** Retorna la url base sense el protocol.
   * {@link https://docs.kucoin.com/#base-url Base URL}
   * {@link https://docs.kucoin.com/#sandbox Sandbox}
   */
  baseUrl(): string { return this.isTest ? `openapi-sandbox.kucoin.com` : `api.kucoin.com`; }


  // ---------------------------------------------------------------------------------------------------
  //  Market
  // ---------------------------------------------------------------------------------------------------

  /** {@link https://docs.kucoin.com/#get-market-list Get Market List} */
  async getMarketsList(): Promise<string[]> {
    const results = await this.get('api/v1/markets', { isPublic: true }) as { data: string[] }; 
    return results.data;
  }

  /** {@link https://docs.kucoin.com/#get-symbols-list Get Symbols List} */
  getSymbolsList(params?: KucoinSpotSymbolsInformationRequest): Promise<KucoinSpotSymbolInformation[]> {
    return this.get('api/v1/symbols', { params, isPublic: true });
  }

  /** {@link https://docs.kucoin.com/#get-klines Get Klines} */
  async getSymbolKlines(params?: KucoinSpotSymbolKlinesRequest): Promise<KucoinSpotSymbolKline[]> {
    const results = await this.get('api/v1/market/candles', { isPublic: true, params });
    if (results.code === '200000') {
      return results.data.map((c: string[]) => {
        const [time, open, close, high, low, volume, turnover] = c;
        const candle: KucoinSpotSymbolKline = { time, open, close, high, low, volume, turnover };
        return candle;
      });
    }
    return Promise.reject(results);
  }


  // ---------------------------------------------------------------------------------------------------
  //  Account
  // ---------------------------------------------------------------------------------------------------

  /** {@link https://docs.kucoin.com/#get-user-info-of-all-sub-accounts Get User Info of all Sub-Accounts} */
  getUserInfo(): Promise<KucoinSpotUserInfo[]> {
    return this.get('api/v1/sub/user');
  }

  /** {@link https://docs.kucoin.com/#list-accounts List Accounts} */
  async getAccountsList(params?: KucoinSpotListAccountsRequest): Promise<KucoinSpotListAccount[]> {
    const results = await this.get('api/v1/accounts', { params }) as { code: string; data: KucoinSpotListAccount[] };
    if (results.code === '200000') { return results.data; }
    return Promise.reject(results);
  }

  /** {@link https://docs.kucoin.com/#get-an-account Get an Account} */
  async getAccountInformation(accountId: string): Promise<KucoinSpotAccountInformation> {
    const results = await this.get(`api/v1/accounts/${accountId}`) as { code: string; data: KucoinSpotAccountInformation };
    if (results.code === '200000') { return results.data; }
    return Promise.reject(results);
  }

  /** {@link https://docs.kucoin.com/#create-an-account Create an Account} */
  postAccount(params: KucoinSpotCreateAccountRequest): Promise<KucoinSpotCreateAccountResponse> {
    return this.post('api/v1/accounts', { params });
  }

  /** {@link https://docs.kucoin.com/#get-account-balance-of-a-sub-account Get Account Balance of a Sub-Account} */
  getAccountBalance(subUserId: string): Promise<KucoinSpotAccountBalanceResponse> {
    return this.get(`api/v1/sub-accounts/${subUserId}`);
  }


  // ---------------------------------------------------------------------------------------------------
  //  Orders
  // ---------------------------------------------------------------------------------------------------

  /** {@link https://docs.kucoin.com/#list-orders List Orders} */
  async getOrders(params: KucoinSpotGetOrdersRequest): Promise<KucoinSpotOrderResponse> {
    const results = await this.get('api/v1/orders', { params }) as { code: string; data: KucoinSpotOrderResponse };
    if (results.code === '200000') { return results.data; }
    return Promise.reject(results);
  }

  /** {@link https://docs.kucoin.com/#recent-orders Recent Orders} */
  async getRecentOrders(): Promise<KucoinSpotOrderResponse> {
    const results = await this.get('api/v1/limit/orders') as { code: string; data: KucoinSpotOrderResponse };
    if (results.code === '200000') { return results.data; }
    return Promise.reject(results);
  }

  /** {@link https://docs.kucoin.com/#get-an-order Get an order} */
  getOrder(orderId: string): Promise<KucoinSpotOrder> {
    return this.get(`api/v1/orders/${orderId}`);
  }

  /** {@link https://docs.kucoin.com/#list-fills List Fills} */
  async getFills(params: KucoinSpotGetFillsRequest): Promise<KucoinSpotGetFillsResponse> {
    const results = await  this.get(`api/v1/fills`, { params }) as { code: string; data: KucoinSpotGetFillsResponse };
    if (results.code === '200000') { return results.data; }
    return Promise.reject(results);
  }

  /** {@link https://docs.kucoin.com/#recent-fills Recent Fills} */
  async getRecentFills(): Promise<KucoinSpotOrderFilled[]> {
    const results = await this.get(`api/v1/limit/fills`) as { code: string; data: KucoinSpotOrderFilled[] };
    if (results.code === '200000') { return results.data; }
    return Promise.reject(results);
  }

  /** {@link https://docs.kucoin.com/#place-a-new-order Place a new order} */
  postOrder(params: KucoinSpotPostOrderRequest): Promise<KucoinSpotOrderResponse> {
    return this.post('api/v1/orders', { params });
  }

  /** {@link https://docs.kucoin.com/#cancel-an-order Cancel an order} */
  cancelOrder(orderId: string): Promise<KucoinSpotOrderResponse> {
    return this.delete(`api/v1/orders/${orderId}`);
  }

  /** {@link https://docs.kucoin.com/#cancel-all-orders Cancel all orders} */
  cancelAllSymbolOrders(params: KucoinSpotCancelAllSymbolOrdersRequest): Promise<KucoinSpotCancelAllSymbolOrdersResponse> {
    return this.delete('api/v1/orders', { params });
  }

}
