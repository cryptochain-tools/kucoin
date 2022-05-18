"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KucoinApi = void 0;
const axios_1 = __importDefault(require("axios"));
const crypto_1 = require("crypto");
class KucoinApi {
    constructor(options) {
        this.options = Object.assign(Object.assign({}, this.defaultOptions), options);
    }
    get apiKey() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.credentials.apiKey; }
    get apiSecret() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.credentials.apiSecret; }
    get apiPassphrase() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.credentials.apiPassphrase; }
    get isTest() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.isTest; }
    get defaultOptions() {
        return {
            isTest: false,
        };
    }
    setCredentials(data) {
        this.options.credentials.apiKey = data.apiKey;
        this.options.credentials.apiSecret = data.apiSecret;
        this.options.credentials.apiPassphrase = data.apiPassphrase;
    }
    get(endpoint, options) { return this.request('GET', endpoint, options); }
    post(endpoint, options) { return this.request('POST', endpoint, options); }
    put(endpoint, options) { return this.request('PUT', endpoint, options); }
    delete(endpoint, options) { return this.request('DELETE', endpoint, options); }
    request(method, endpoint, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options) {
                options = {};
            }
            const isPublic = options.isPublic === undefined ? false : options.isPublic;
            const headers = options.headers === undefined ? undefined : options.headers;
            const params = options.params === undefined ? undefined : options.params;
            const baseUrl = options.baseUrlOverride || this.baseUrl();
            const [uri, _query = ''] = endpoint.split('?');
            const config = {
                method,
                headers: Object.assign({}, headers),
                timeout: 1000 * 60 * 5,
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
                const authHeaders = yield this.getAuthHeaders(method, '/' + endpoint, body);
                config.headers = Object.assign(Object.assign({}, config.headers), authHeaders);
            }
            config.url = 'https://' + [baseUrl, endpoint].join('/');
            console.log(config);
            return (0, axios_1.default)(config).then(response => {
                if (response.status !== 200) {
                    throw response;
                }
                return response.data;
            }).catch(e => this.parseException(e, config.url));
        });
    }
    resolveData(method, data = {}, options) {
        if (!options) {
            options = {};
        }
        const strictValidation = options.strictValidation === undefined ? false : options.strictValidation;
        const encodeValues = options.encodeValues === undefined ? true : options.encodeValues;
        const d = {};
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
            };
        }
        else {
            return {
                query: '',
                body: JSON.stringify(d),
            };
        }
    }
    getAuthHeaders(method, endpoint, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { apiKey, apiSecret, apiPassphrase } = this;
            const authVersion = 2;
            const timestamp = Date.now() + '';
            const data = (method === 'GET' || method === 'DELETE') ? this.formatQuery(params) : JSON.stringify(params).slice(1, -1);
            const message = timestamp + method + endpoint + data;
            const signature = yield this.signMessage(message, apiSecret);
            const headers = {
                'KC-API-KEY': apiKey,
                'KC-API-SIGN': signature,
                'KC-API-TIMESTAMP': timestamp.toString(),
                'KC-API-PASSPHRASE': apiPassphrase || '',
            };
            if (authVersion && (authVersion === 2 || authVersion === '2')) {
                headers['KC-API-KEY-VERSION'] = 2;
                const passprhase = yield this.signMessage(apiPassphrase || '', apiSecret);
                headers['KC-API-PASSPHRASE'] = passprhase;
            }
            return headers;
        });
    }
    formatQuery(params) {
        if (!!params && JSON.stringify(params).length !== 2) {
            const serialisedParams = this.serialiseParams(params, { encodeValues: true });
            return '?' + serialisedParams;
        }
        else {
            return '';
        }
    }
    serialiseParams(params = {}, options) {
        if (!options) {
            options = {};
        }
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
    }
    ;
    signMessage(message, secret) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof crypto_1.createHmac === 'function') {
                return (0, crypto_1.createHmac)('sha256', secret).update(message).digest('base64');
            }
            const encoder = new TextEncoder();
            const keyData = encoder.encode(secret);
            const algorithm = { name: 'HMAC', hash: { name: 'SHA-256' } };
            const extractable = false;
            const keyUsages = ['sign'];
            const key = yield window.crypto.subtle.importKey('raw', keyData, algorithm, extractable, keyUsages);
            const signature = yield window.crypto.subtle.sign('HMAC', key, encoder.encode(message));
            return Buffer.from(signature).toString('base64');
        });
    }
    ;
    parseException(e, url) {
        var _a, _b;
        const { response, request, message } = e;
        if (!response) {
            throw request ? e : message;
        }
        throw {
            code: (_a = response.data) === null || _a === void 0 ? void 0 : _a.code,
            message: (_b = response.data) === null || _b === void 0 ? void 0 : _b.msg,
            body: response.data,
            headers: response.headers,
            requestUrl: url,
            requestBody: request.body,
            options: Object.assign({}, this.options),
        };
    }
    getWebsocketToken(access) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.post(`api/v1/bullet-${access}`, { isPublic: access === 'public' });
            if (results.code === '200000') {
                return results.data;
            }
            return Promise.reject(results);
        });
    }
}
exports.KucoinApi = KucoinApi;
//# sourceMappingURL=kucoin-api.js.map