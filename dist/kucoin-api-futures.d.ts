import { KucoinApi } from "./kucoin-api";
import { KucoinApiOptions, KucoinMarketType } from "./types/kucoin.types";
import { KucoinFuturesAccountOverview, KucoinFuturesAccountOverviewRequest, KucoinFuturesCancelAllSymbolOrdersRequest, KucoinFuturesCancelOrdersResponse, KucoinFuturesGetFillsRequest, KucoinFuturesGetFillsResponse, KucoinFuturesGetOrderRequest, KucoinFuturesGetOrdersRequest, KucoinFuturesGetOrdersResponse, KucoinFuturesOrder, KucoinFuturesOrderFilled, KucoinFuturesOrderResponse, KucoinFuturesPosition, KucoinFuturesPostOrderRequest, KucoinFuturesRiskLimit, KucoinFuturesSymbolInformation, KucoinFuturesSymbolPriceTicker, KucoinFuturesSymbolRequest } from "./types/kucoin-futures.types";
export declare class KucoinApiFutures extends KucoinApi {
    market: KucoinMarketType;
    constructor(options?: KucoinApiOptions);
    baseUrl(): string;
    getActiveSymbols(): Promise<KucoinFuturesSymbolInformation[]>;
    getSymbolInformation(symbol: string): Promise<KucoinFuturesSymbolInformation>;
    getSymbolPriceTicker(params: KucoinFuturesSymbolRequest): Promise<KucoinFuturesSymbolPriceTicker>;
    getKChart(symbol: string, from: number, to: number): Promise<any>;
    getAccountOverview(params?: KucoinFuturesAccountOverviewRequest): Promise<KucoinFuturesAccountOverview>;
    getPositions(): Promise<KucoinFuturesPosition>;
    getPosition(params: KucoinFuturesSymbolRequest): Promise<KucoinFuturesPosition>;
    getRiskLimitLevel(symbol: string): Promise<KucoinFuturesRiskLimit[]>;
    getOrders(params?: KucoinFuturesGetOrdersRequest): Promise<KucoinFuturesGetOrdersResponse>;
    getOrder(orderId: string, params: KucoinFuturesGetOrderRequest): Promise<KucoinFuturesOrder>;
    getFills(params?: KucoinFuturesGetFillsRequest): Promise<KucoinFuturesGetFillsResponse>;
    getRecentFills(): Promise<KucoinFuturesOrderFilled>;
    postOrder(params: KucoinFuturesPostOrderRequest): Promise<KucoinFuturesOrderResponse>;
    cancelOrder(orderId: string): Promise<KucoinFuturesCancelOrdersResponse>;
    cancelAllSymbolOrders(params?: KucoinFuturesCancelAllSymbolOrdersRequest): Promise<KucoinFuturesCancelOrdersResponse>;
}
//# sourceMappingURL=kucoin-api-futures.d.ts.map