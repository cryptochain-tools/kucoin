import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { createHmac } from 'crypto';

import { KucoinApiOptions, KucoinApiResquestOptions, KucoinMarketType, KucoinWebsocketTokenResponse } from './types/kucoin.types';



export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS';

export abstract class KucoinApi {
  
  /** Indica el tipus de mercat. */
  abstract market: KucoinMarketType;
  /** Retorna la url base sense el protocol. */
  abstract baseUrl(): string;

  /** Opcions de configuració. */
  protected options: KucoinApiOptions;

  constructor(
    options?: KucoinApiOptions,
  ) {
    // @ts-ignore
    this.options = { ...this.defaultOptions, ...options };
  }


  // ---------------------------------------------------------------------------------------------------
  //  options
  // ---------------------------------------------------------------------------------------------------

  /** {@link https://www.kucoin.com/es/account/api/create?type=trade Create API Keys} */
  get apiKey(): string | undefined { return this.options?.apiKey; }
  
  get apiSecret(): string | undefined { return this.options?.apiSecret; }
  
  get apiPassphrase(): string | undefined { return this.options?.apiPassphrase; }
  
     // @ts-ignore
  get isTest(): boolean { return this.options?.isTest; }
  
  get defaultOptions(): Partial<KucoinApiOptions> {
    return {
      isTest: false,
      // recvWindow: 5000,
    }
  }

  public setCredentials(data: { apiKey: string; apiSecret: string; apiPassphrase: string }): void {
    this.options.apiKey = data.apiKey;
    this.options.apiSecret = data.apiSecret;
    this.options.apiPassphrase = data.apiPassphrase;
  }


  // ---------------------------------------------------------------------------------------------------
  //  request helpers
  // ---------------------------------------------------------------------------------------------------

  public get(endpoint: string, options?: KucoinApiResquestOptions): Promise<any> { return this.request('GET', endpoint, options); }

  public post(endpoint: string, options?: KucoinApiResquestOptions): Promise<any> { return this.request('POST', endpoint, options); }

  public put(endpoint: string, options?: KucoinApiResquestOptions): Promise<any> { return this.request('PUT', endpoint, options); }

  public delete(endpoint: string, options?: KucoinApiResquestOptions): Promise<any> { return this.request('DELETE', endpoint, options); }


  // ---------------------------------------------------------------------------------------------------
  //  request
  // ---------------------------------------------------------------------------------------------------

  async request(method: HttpMethod, endpoint: string, options?: KucoinApiResquestOptions): Promise<any> {
    if (!options) { options = {}; }
    const isPublic = options.isPublic === undefined ? false : options.isPublic;
    const headers = options.headers === undefined ? undefined : options.headers;
    const params = options.params === undefined ? undefined : options.params;

    const baseUrl = options.baseUrlOverride || this.baseUrl();
    const [uri, _query = ''] = endpoint.split('?');

    const config:any = {
      method,
      // url: 'https://' + [baseUrl, endpoint].join('/'),
      headers: { ...headers as any},
      timeout: 1000 * 60 * 5, // 5 min.
    };

    const { body, query } = this.resolveData(method, params || {});

    if (query) {
      const concat = endpoint.includes('?') ? (endpoint.endsWith('?') ? '' : '&') : '?';
      endpoint += concat + query;
    }

    if (method === 'POST' || method === 'PUT') {
      config.headers['Content-Type'] = 'application/json';
      config.data = body;
    }

    if (!isPublic) {
      const authHeaders = await this.getAuthHeaders(method, '/' + endpoint, body);
      config.headers = { ...config.headers, ...authHeaders } as any;
    }
    
    config.url = 'https://' + [baseUrl, endpoint].join('/');

    
    return axios(config).then(response => {
      // console.log(config.url, response);
      if (response.status !== 200) { throw response; }
      return response.data;
    }).catch(e => this.parseException(e, config.url));
  }

  protected resolveData(method: HttpMethod, data: { [key: string]: any } = {}, options?: { encodeValues?: boolean, strictValidation?: boolean }) {
    if (!options) { options = {}; }
    const strictValidation = options.strictValidation === undefined ? false : options.strictValidation;
    const encodeValues = options.encodeValues === undefined ? true : options.encodeValues;
    const d: { [key: string]: any } = {};
    Object.keys(data).map(key => {
      const value = data[key];
      if (strictValidation && value === undefined) {
        throw new Error('Failed to sign API request due to undefined parameter');
      }
      const encodedValue = encodeValues ? encodeURIComponent(value) : value;
      d[key] = encodedValue;
    });

    if (method === 'GET' || method === 'DELETE') {
      return {
        query: Object.keys(d).map(v => `${v}=${d[v]}`).join('&'),
        body: undefined,
      }
    } else {
      return {
        query: '',
        body: JSON.stringify(d),
      }
    }
  }

  protected async getAuthHeaders(method: string, endpoint: string, params: any) {
    const { apiKey, apiSecret, apiPassphrase } = this;
    // const { authVersion } = getConfig();
    const authVersion: any = 2;
    const timestamp = Date.now() + '';
    // const message = timestamp + method.toUpperCase() + endpoint + data;
    const data = (method === 'GET' || method === 'DELETE') ? this.formatQuery(params) : JSON.stringify(params).slice(1, -1);
    const message = timestamp + method + endpoint + data;
    // console.log('message =>', message);
    const signature = await this.signMessage(message, apiSecret as string);
    const headers: { [header: string]: number | string } = {
      // 'User-Agent': `KuCoin-Node-SDK/${version}`,
      // @ts-ignore
      'KC-API-KEY': apiKey,
      'KC-API-SIGN': signature,
      'KC-API-TIMESTAMP': timestamp.toString(),
      'KC-API-PASSPHRASE': apiPassphrase || '',
    };
    if (authVersion && (authVersion === 2 || authVersion === '2')) { // for v2 API-KEY
      headers['KC-API-KEY-VERSION'] = 2;
      const passprhase = await this.signMessage(apiPassphrase || '', apiSecret as string);
      headers['KC-API-PASSPHRASE'] = passprhase;
    }
    return headers;
  }


  protected formatQuery(params: any) {
    if (!!params && JSON.stringify(params).length !== 2) {
      const serialisedParams = this.serialiseParams(params, { encodeValues: true });
      return '?' + serialisedParams;
      // return '?' + qs.stringify(params)
    } else {
      return '';
    }
  }

  protected serialiseParams(params: { [key: string]: any } = {}, options?: { encodeValues?: boolean, strictValidation?: boolean }): string {
    if (!options) { options = {}; }
    const strictValidation = options.strictValidation === undefined ? false : options.strictValidation;
    const encodeValues = options.encodeValues === undefined ? true : options.encodeValues;
    return Object.keys(params).map(key => {
      const value = params[key];
      if (strictValidation && value === undefined) {
        throw new Error('Failed to sign API request due to undefined parameter');
      }
      const encodedValue = encodeValues ? encodeURIComponent(value) : value;
      return `${key}=${encodedValue}`;
    }).join('&');
  };


  protected async signMessage(message: string, secret: string): Promise<string> {
    // Si és possible, fem servir la funció de crypto.
    if (typeof createHmac === 'function') {
      return createHmac('sha256', secret).update(message).digest('base64');
    }
    // Si no s'ha pogut importar la funció en entorn browser, li donem suport.
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const algorithm = {name: 'HMAC', hash: {name: 'SHA-256'}};
    const extractable = false;
    const keyUsages: KeyUsage[] = ['sign'];
    const key = await window.crypto.subtle.importKey('raw', keyData, algorithm, extractable, keyUsages);
    const signature = await window.crypto.subtle.sign('HMAC', key, encoder.encode(message));
    return Buffer.from(signature).toString('base64');
  };

  protected parseException(e: any, url: string): unknown {
    const { response, request, message } = e;
    // Si no hem rebut una resposta...
    if (!response) { throw request ? e : message; }
    throw {
      code: response.data?.code,
      message: response.data?.msg,
      body: response.data,
      headers: response.headers,
      requestUrl: url,
      requestBody: request.body,
      options: { ...this.options },
    };
  }

  
  // ---------------------------------------------------------------------------------------------------
  //  Websocket token
  // ---------------------------------------------------------------------------------------------------

  /** {@link https://docs.kucoin.com/#apply-connect-token Apply connect token} */
  async getWebsocketToken(access: 'public' | 'private'): Promise<KucoinWebsocketTokenResponse> {
    const results = await this.post(`api/v1/bullet-${access}`, { isPublic: access === 'public' }) as { code: string; data: KucoinWebsocketTokenResponse };
    if (results.code === '200000') { return results.data; }
    return Promise.reject(results);
  }

}