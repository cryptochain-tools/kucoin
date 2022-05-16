import { KucoinApi } from "./kucoin-api";
import { KucoinApiOptions, KucoinMarketType } from "./types/kucoin.types";
import {
  KucoinFuturesAccountOverview,
  KucoinFuturesAccountOverviewRequest,
  KucoinFuturesCancelAllSymbolOrdersRequest,
  KucoinFuturesCancelOrdersResponse,
  KucoinFuturesGetFillsRequest,
  KucoinFuturesGetFillsResponse,
  KucoinFuturesGetOrderRequest,
  KucoinFuturesGetOrdersRequest,
  KucoinFuturesGetOrdersResponse,
  KucoinFuturesOrder,
  KucoinFuturesOrderFilled,
  KucoinFuturesOrderResponse,
  KucoinFuturesPosition,
  KucoinFuturesPostOrderRequest,
  KucoinFuturesRiskLimit,
  KucoinFuturesSymbolInformation, KucoinFuturesSymbolPriceTicker, KucoinFuturesSymbolRequest,
} from "./types/kucoin-futures.types";


export class KucoinApiFutures extends KucoinApi {
  
  market: KucoinMarketType = 'futures';

  constructor(
    options?: KucoinApiOptions,
  ) {
    super(options);
  }

  /** Retorna la url base sense el protocol.
   * {@link https://docs.kucoin.com/futures/#request API Server Address}
   * {@link https://docs.kucoin.com/futures/#sandbox Sandbox}
   */
  baseUrl(): string { return this.isTest ? `api-sandbox-futures.kucoin.com` : `api-futures.kucoin.com`; }


  // ---------------------------------------------------------------------------------------------------
  //  Market
  // ---------------------------------------------------------------------------------------------------

  /** {@link https://docs.kucoin.com/futures/#get-open-contract-list Get Open Contract List} */
  getActiveSymbols(): Promise<KucoinFuturesSymbolInformation[]> {
    return this.get(`api/v1/contracts/active`, { isPublic: true });
  }

  /** {@link https://docs.kucoin.com/futures/#get-order-info-of-the-contract Get Order Info of the Contract} */
  getSymbolInformation(symbol: string): Promise<KucoinFuturesSymbolInformation> {
    return this.get(`api/v1/contracts/${symbol}`, { isPublic: true });
  }

  /** {@link https://docs.kucoin.com/futures/#get-real-time-ticker Get Ticker} */
  async getSymbolPriceTicker(params: KucoinFuturesSymbolRequest): Promise<KucoinFuturesSymbolPriceTicker> {
    const results = await this.get(`api/v1/ticker`, { isPublic: true, params }) as { code: string; data: KucoinFuturesSymbolPriceTicker };
    if (results.code === '200000') { return results.data; }
    return Promise.reject(results);
  }


  // ---------------------------------------------------------------------------------------------------
  //  Account
  // ---------------------------------------------------------------------------------------------------

  /** {@link https://docs.kucoin.com/futures/#get-account-overview Get Account Overview} */
  async getAccountOverview(params?: KucoinFuturesAccountOverviewRequest): Promise<KucoinFuturesAccountOverview> {
    const results = await this.get('api/v1/account-overview', { params }) as { code: string; data: KucoinFuturesAccountOverview };
    if (results.code === '200000') { return results.data; }
    return Promise.reject(results);
  }

  /** {@link https://docs.kucoin.com/futures/#get-position-list Get Position List} */
  async getPositions(): Promise<KucoinFuturesPosition> {
    return this.get('api/v1/positions');
  }

  /** {@link https://docs.kucoin.com/futures/#get-position-details Get Position Details} */
  async getPosition(params: KucoinFuturesSymbolRequest): Promise<KucoinFuturesPosition> {
    return this.get('api/v1/position', { params });
  }
  
  /** {@link https://docs.kucoin.com/futures/#risk-limit-level Risk Limit Level} */
  async getRiskLimitLevel(symbol: string): Promise<KucoinFuturesRiskLimit[]> {
    const results = await this.get(`api/v1/contracts/risk-limit/${symbol}`) as { code: string; data: KucoinFuturesRiskLimit[] };
    if (results.code === '200000') { return results.data; }
    return Promise.reject(results);
  }
  

  // ---------------------------------------------------------------------------------------------------
  //  Orders
  // ---------------------------------------------------------------------------------------------------

  /** {@link https://docs.kucoin.com/futures/#get-order-list Get Order List} */
  async getOrders(params?: KucoinFuturesGetOrdersRequest): Promise<KucoinFuturesGetOrdersResponse> {
    const results = await this.get('api/v1/orders', { params }) as { code: string; data: KucoinFuturesGetOrdersResponse };
    if (results.code === '200000') { return results.data; }
    return Promise.reject(results);
  }

  /** {@link https://docs.kucoin.com/futures/#get-details-of-a-single-order Get Details of a Single Order} */
  async getOrder(orderId: string, params: KucoinFuturesGetOrderRequest): Promise<KucoinFuturesOrder> {
    const results = await this.get(`api/v1/orders/${orderId}`, { params }) as { code: string; data: KucoinFuturesOrder };
    if (results.code === '200000') { return results.data; }
    return Promise.reject(results);
  }

  /** {@link https://docs.kucoin.com/futures/#get-fills Get Fills} */
  async getFills(params?: KucoinFuturesGetFillsRequest): Promise<KucoinFuturesGetFillsResponse> {
    const results = await this.get(`api/v1/fills`, { params }) as { code: string; data: KucoinFuturesGetFillsResponse };
    if (results.code === '200000') { return results.data; }
    return Promise.reject(results);
  }

  /** {@link https://docs.kucoin.com/futures/#recent-fills Recent Fills} */
  async getRecentFills(): Promise<KucoinFuturesOrderFilled> {
    const results = await this.get(`api/v1/recentFills`) as { code: string; data: KucoinFuturesOrderFilled };
    if (results.code === '200000') { return results.data; }
    return Promise.reject(results);
  }

  /** {@link https://docs.kucoin.com/futures/#place-an-order Place an Order} */
  async postOrder(params: KucoinFuturesPostOrderRequest): Promise<KucoinFuturesOrderResponse> {
    const results = await this.post('api/v1/orders', { params }) as { code: string; data: KucoinFuturesOrderResponse };
    if (results.code === '200000') { return results.data; }
    return Promise.reject(results);
  }

  /** {@link https://docs.kucoin.com/futures/#cancel-an-order Cancel an Order} */
  async cancelOrder(orderId: string): Promise<KucoinFuturesCancelOrdersResponse> {
    const results = await this.delete(`api/v1/orders/${orderId}`) as { code: string; data: KucoinFuturesCancelOrdersResponse };
    if (results.code === '200000') { return results.data; }
    return Promise.reject(results);
  }

  /** {@link https://docs.kucoin.com/futures/#limit-order-mass-cancelation Limit Order Mass Cancelation} */
  async cancelAllSymbolOrders(params?: KucoinFuturesCancelAllSymbolOrdersRequest): Promise<KucoinFuturesCancelOrdersResponse> {
    const results = await this.delete(`api/v1/orders`, { params }) as { code: string; data: KucoinFuturesCancelOrdersResponse };
    if (results.code === '200000') { return results.data; }
    return Promise.reject(results);
  }


}