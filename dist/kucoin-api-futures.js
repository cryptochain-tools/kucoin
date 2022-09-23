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
exports.KucoinApiFutures = void 0;
const kucoin_api_1 = require("./kucoin-api");
class KucoinApiFutures extends kucoin_api_1.KucoinApi {
    constructor(options) {
        super(options);
        this.market = 'futures';
    }
    baseUrl() { return this.isTest ? `api-sandbox-futures.kucoin.com` : `api-futures.kucoin.com`; }
    getActiveSymbols() {
        return this.get(`api/v1/contracts/active`, { isPublic: true });
    }
    getSymbolInformation(symbol) {
        return this.get(`api/v1/contracts/${symbol}`, { isPublic: true });
    }
    getSymbolPriceTicker(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.get(`api/v1/ticker`, { isPublic: true, params });
            if (results.code === '200000') {
                return results.data;
            }
            return Promise.reject(results);
        });
    }
    getKChart(symbol, from, to) {
        return this.get(`api/v1/kline/query?symbol=${symbol}&granularity=1&from=${from}&to=${to}`, { isPublic: true });
    }
    getAccountOverview(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.get('api/v1/account-overview', { params });
            if (results.code === '200000') {
                return results.data;
            }
            return Promise.reject(results);
        });
    }
    getPositions() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get('api/v1/positions');
        });
    }
    getPosition(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get('api/v1/position', { params });
        });
    }
    getRiskLimitLevel(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.get(`api/v1/contracts/risk-limit/${symbol}`);
            if (results.code === '200000') {
                return results.data;
            }
            return Promise.reject(results);
        });
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
    getOrder(orderId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.get(`api/v1/orders/${orderId}`, { params });
            if (results.code === '200000') {
                return results.data;
            }
            return Promise.reject(results);
        });
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
            const results = yield this.get(`api/v1/recentFills`);
            if (results.code === '200000') {
                return results.data;
            }
            return Promise.reject(results);
        });
    }
    postOrder(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.post('api/v1/orders', { params });
            if (results.code === '200000') {
                return results.data;
            }
            return Promise.reject(results);
        });
    }
    cancelOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.delete(`api/v1/orders/${orderId}`);
            if (results.code === '200000') {
                return results.data;
            }
            return Promise.reject(results);
        });
    }
    cancelAllSymbolOrders(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.delete(`api/v1/orders`, { params });
            if (results.code === '200000') {
                return results.data;
            }
            return Promise.reject(results);
        });
    }
}
exports.KucoinApiFutures = KucoinApiFutures;
//# sourceMappingURL=kucoin-api-futures.js.map