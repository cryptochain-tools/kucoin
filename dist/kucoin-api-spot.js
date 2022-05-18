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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KucoinApiSpot = void 0;
const kucoin_api_1 = require("./kucoin-api");
class KucoinApiSpot extends kucoin_api_1.KucoinApi {
    constructor(options) {
        super(options);
        this.market = 'spot';
    }
    baseUrl() { return this.isTest ? `openapi-sandbox.kucoin.com` : `api.kucoin.com`; }
    getMarketsList() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.get('api/v1/markets', { isPublic: true });
            return results.data;
        });
    }
    getSymbolsList(params) {
        return this.get('api/v1/symbols', { params, isPublic: true });
    }
    getSymbolKlines(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.get('api/v1/market/candles', { isPublic: true, params });
            if (results.code === '200000') {
                return results.data.map((c) => {
                    const [time, open, close, high, low, volume, turnover] = c;
                    const candle = { time, open, close, high, low, volume, turnover };
                    return candle;
                });
            }
            return Promise.reject(results);
        });
    }
    getUserInfo() {
        return this.get('api/v1/sub/user');
    }
    getAccountsList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.get('api/v1/accounts', { params });
            if (results.code === '200000') {
                return results.data;
            }
            return Promise.reject(results);
        });
    }
    getAccountInformation(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.get(`api/v1/accounts/${accountId}`);
            if (results.code === '200000') {
                return results.data;
            }
            return Promise.reject(results);
        });
    }
    postAccount(params) {
        return this.post('api/v1/accounts', { params });
    }
    getAccountBalance(subUserId) {
        return this.get(`api/v1/sub-accounts/${subUserId}`);
    }
    getOrders(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.get('api/v1/orders', { params });
            if (results.code === '200000') {
                return results.data;
            }
            return Promise.reject(results);
        });
    }
    getRecentOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.get('api/v1/limit/orders');
            if (results.code === '200000') {
                return results.data;
            }
            return Promise.reject(results);
        });
    }
    getOrder(orderId) {
        return this.get(`api/v1/orders/${orderId}`);
    }
    getFills(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.get(`api/v1/fills`, { params });
            if (results.code === '200000') {
                return results.data;
            }
            return Promise.reject(results);
        });
    }
    getRecentFills() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.get(`api/v1/limit/fills`);
            if (results.code === '200000') {
                return results.data;
            }
            return Promise.reject(results);
        });
    }
    postOrder(params) {
        return this.post('api/v1/orders', { params });
    }
    cancelOrder(orderId) {
        return this.delete(`api/v1/orders/${orderId}`);
    }
    cancelAllSymbolOrders(params) {
        return this.delete('api/v1/orders', { params });
    }
}
exports.KucoinApiSpot = KucoinApiSpot;
//# sourceMappingURL=kucoin-api-spot.js.map