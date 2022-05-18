export interface KucoinApiOptions {
    apiKey: string;
    apiSecret: string;
    apiPassphrase: string;
    isTest?: boolean;
}
export interface KucoinApiResquestOptions {
    params?: any;
    headers?: {
        [key: string]: string | number;
    };
    isPublic?: boolean;
    baseUrlOverride?: string;
}
export interface KucoinWebsocketTokenResponse {
    instanceServers: KucoinWebsocketServer[];
    token: string;
}
export interface KucoinWebsocketServer {
    endpoint: string;
    protocol: string;
    encrypt: boolean;
    pingInterval: number;
    pongTimeout: number;
}
export declare type KucoinMarketType = 'spot' | 'futures' | 'margin';
export declare type KucoinOrderSide = 'buy' | 'sell';
export declare type KucoinOrderType = 'limit' | 'market' | 'limit_stop' | 'market_stop';
export declare type KucoinStopOrderType = 'up' | 'down';
export declare type KucoinOrderTimeInForce = 'GTC' | 'IOC';
export declare type KucoinOrderStatus = 'NEW' | 'PARTIALLY_FILLED' | 'FILLED' | 'CANCELED' | 'CANCELLING' | 'PENDING_CANCEL' | 'REJECTED' | 'EXPIRED';
export declare type KucoinOrderExecutionType = 'NEW' | 'CANCELED' | 'REJECTED' | 'TRADE' | 'EXPIRED';
export declare type KucoinTradeType = 'TRADE' | 'MARGIN_TRADE';
//# sourceMappingURL=kucoin.types.d.ts.map