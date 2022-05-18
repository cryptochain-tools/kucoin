import { AxiosError } from "axios";
import { KucoinApiOptions, KucoinApiResquestOptions, KucoinMarketType, KucoinWebsocketTokenResponse } from './types/kucoin.types';
export declare type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS';
export declare abstract class KucoinApi {
    abstract market: KucoinMarketType;
    abstract baseUrl(): string;
    protected options: KucoinApiOptions;
    constructor(options?: KucoinApiOptions);
    get apiKey(): string;
    get apiSecret(): string;
    get apiPassphrase(): string;
    get isTest(): boolean;
    get defaultOptions(): Partial<KucoinApiOptions>;
    setCredentials(data: {
        apiKey: string;
        apiSecret: string;
        apiPassphrase: string;
    }): void;
    get(endpoint: string, options?: KucoinApiResquestOptions): Promise<any>;
    post(endpoint: string, options?: KucoinApiResquestOptions): Promise<any>;
    put(endpoint: string, options?: KucoinApiResquestOptions): Promise<any>;
    delete(endpoint: string, options?: KucoinApiResquestOptions): Promise<any>;
    request(method: HttpMethod, endpoint: string, options?: KucoinApiResquestOptions): Promise<any>;
    protected resolveData(method: HttpMethod, data?: {
        [key: string]: any;
    }, options?: {
        encodeValues?: boolean;
        strictValidation?: boolean;
    }): {
        query: string;
        body: string;
    };
    protected getAuthHeaders(method: string, endpoint: string, params: any): Promise<{
        [header: string]: string | number;
    }>;
    protected formatQuery(params: any): string;
    protected serialiseParams(params?: {
        [key: string]: any;
    }, options?: {
        encodeValues?: boolean;
        strictValidation?: boolean;
    }): string;
    protected signMessage(message: string, secret: string): Promise<string>;
    protected parseException(e: AxiosError, url: string): unknown;
    getWebsocketToken(access: 'public' | 'private'): Promise<KucoinWebsocketTokenResponse>;
}
//# sourceMappingURL=kucoin-api.d.ts.map