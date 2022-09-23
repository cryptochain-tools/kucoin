import { KucoinApi } from "./kucoin-api";
import { KucoinApiOptions, KucoinMarketType } from "./types/kucoin.types";
import { KucoinSpotListAccountsRequest, KucoinSpotListAccount, KucoinSpotCreateAccountRequest, KucoinSpotCreateAccountResponse, KucoinSpotAccountInformation, KucoinSpotSymbolInformation, KucoinSpotSymbolsInformationRequest, KucoinSpotSymbolKlinesRequest, KucoinSpotSymbolKline, KucoinSpotOrderResponse, KucoinSpotPostOrderRequest, KucoinSpotGetOrdersRequest, KucoinSpotOrder, KucoinSpotCancelAllSymbolOrdersRequest, KucoinSpotCancelAllSymbolOrdersResponse, KucoinSpotAccountBalanceResponse, KucoinSpotUserInfo, KucoinSpotGetFillsRequest, KucoinSpotGetFillsResponse, KucoinSpotOrderFilled, KucoinSpotOrderIdResponse } from './types/kucoin-spot.types';
export declare class KucoinApiSpot extends KucoinApi {
    market: KucoinMarketType;
    constructor(options?: KucoinApiOptions);
    baseUrl(): string;
    getMarketsList(): Promise<string[]>;
    getSymbolsList(params?: KucoinSpotSymbolsInformationRequest): Promise<KucoinSpotSymbolInformation[]>;
    getSymbolKlines(params?: KucoinSpotSymbolKlinesRequest): Promise<KucoinSpotSymbolKline[]>;
    getUserInfo(): Promise<KucoinSpotUserInfo[]>;
    getAccountsList(params?: KucoinSpotListAccountsRequest): Promise<KucoinSpotListAccount[]>;
    getAccountInformation(accountId: string): Promise<KucoinSpotAccountInformation>;
    postAccount(params: KucoinSpotCreateAccountRequest): Promise<KucoinSpotCreateAccountResponse>;
    getAccountBalance(subUserId: string): Promise<KucoinSpotAccountBalanceResponse>;
    getOrders(params: KucoinSpotGetOrdersRequest): Promise<KucoinSpotOrderResponse>;
    getRecentOrders(): Promise<KucoinSpotOrderResponse>;
    getOrder(orderId: string): Promise<KucoinSpotOrder>;
    getFills(params: KucoinSpotGetFillsRequest): Promise<KucoinSpotGetFillsResponse>;
    getRecentFills(): Promise<KucoinSpotOrderFilled[]>;
    postOrder(params: KucoinSpotPostOrderRequest): Promise<KucoinSpotOrderIdResponse>;
    cancelOrder(orderId: string): Promise<KucoinSpotOrderIdResponse>;
    cancelAllSymbolOrders(params: KucoinSpotCancelAllSymbolOrdersRequest): Promise<KucoinSpotCancelAllSymbolOrdersResponse>;
}
//# sourceMappingURL=kucoin-api-spot.d.ts.map