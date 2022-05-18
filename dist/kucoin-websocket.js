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
exports.KucoinWebsocket = void 0;
const isomorphic_ws_1 = __importDefault(require("isomorphic-ws"));
const events_1 = __importDefault(require("events"));
const rxjs_1 = require("rxjs");
const kucoin_api_spot_1 = require("./kucoin-api-spot");
const kucoin_api_futures_1 = require("./kucoin-api-futures");
class KucoinWebsocket extends events_1.default {
    constructor(options) {
        super();
        this.status = 'initial';
        this.emitters = {};
        this.subscriptionId = 0;
        this.options = Object.assign(Object.assign({}, this.defaultOptions), options);
        this.initialize();
    }
    get market() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.market; }
    get streamType() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.streamType; }
    get apiKey() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.credentials.apiKey; }
    get apiSecret() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.credentials.apiSecret; }
    get apiPassphrase() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.credentials.apiPassphrase; }
    get isTest() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.isTest; }
    get reconnectPeriod() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.reconnectPeriod; }
    get pingInterval() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.pingInterval; }
    get pongTimeout() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.pongTimeout; }
    get defaultOptions() {
        return {
            isTest: false,
            reconnectPeriod: 5 * 1000,
            pingInterval: 18 * 1000,
            pongTimeout: 10 * 1000,
        };
    }
    getApiClient() {
        const { credentials, isTest } = this.options;
        return this.market === 'spot' ? new kucoin_api_spot_1.KucoinApiSpot({ credentials, isTest }) : new kucoin_api_futures_1.KucoinApiFutures({ credentials, isTest });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.api = this.getApiClient();
            this.connect();
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const wsType = this.streamType === 'market' ? 'public' : 'private';
            this.api.getWebsocketToken(wsType).then((wsInfo) => {
                console.log(wsInfo);
                const { endpoint, pingInterval, pongTimeout } = wsInfo.instanceServers[0];
                const url = `${endpoint}?token=${wsInfo.token}`;
                this.options.pingInterval = pingInterval || this.defaultOptions.pingInterval;
                this.options.pongTimeout = pongTimeout || this.defaultOptions.pongTimeout;
                console.log(this.wsId, '=> connecting...', url);
                this.ws = new isomorphic_ws_1.default(url);
                this.ws.onopen = event => this.onWsOpen(event);
                this.ws.onerror = event => this.onWsError(event);
                this.ws.onclose = event => this.onWsClose(event);
                this.ws.onmessage = event => this.onWsMessage(event);
                if (typeof this.ws.on === 'function') {
                    this.ws.on('ping', event => this.onWsPing(event));
                    this.ws.on('pong', event => this.onWsPong(event));
                }
                this.ws.onping = (event) => this.onWsPing(event);
                this.ws.onpong = (event) => this.onWsPong(event);
            }).catch(err => console.error(err));
        });
    }
    reconnect() {
        if (this.status === 'reconnecting') {
            return;
        }
        this.status = 'reconnecting';
        this.close();
        setTimeout(() => this.connect(), this.reconnectPeriod);
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.status !== 'reconnecting') {
                    this.status = 'closing';
                }
                if (this.pingTimer) {
                    this.pingTimer.unsubscribe();
                }
                if (this.pongTimer) {
                    this.pongTimer.unsubscribe();
                }
                this.ws.close();
                if (typeof this.ws.terminate === 'function') {
                    this.ws.terminate();
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    destroy() {
        Object.keys(this.emitters).map(WsStreamEmitterType => this.emitters[WsStreamEmitterType].complete());
        this.emitters = {};
    }
    onWsOpen(event) {
        if (this.status === 'reconnecting') {
            console.log(this.wsId, '=> reconnected!');
            this.emit('reconnected', { event });
        }
        else {
            console.log(this.wsId, '=> connected!');
            this.emit('open', { event });
        }
        this.status = 'connected';
        if (this.pingTimer) {
            this.pingTimer.unsubscribe();
        }
        this.pingTimer = (0, rxjs_1.interval)(this.pingInterval).subscribe(() => this.ping());
        this.respawnTopicSubscriptions();
    }
    onWsClose(event) {
        console.log(this.wsId, '=> closed');
        if (this.status !== 'closing') {
            this.reconnect();
            this.emit('reconnecting', { event });
        }
        else {
            this.status = 'initial';
            this.emit('close', { event });
        }
    }
    onWsError(event) {
        console.error(`${this.wsId} =>`, (event === null || event === void 0 ? void 0 : event.error) || event);
    }
    ping() {
        console.log(this.wsId, `=> Sending ping...`);
        try {
            if (this.pongTimer) {
                this.pongTimer.unsubscribe();
            }
            if (typeof this.ws.ping === 'function') {
                this.pongTimer = (0, rxjs_1.timer)(this.pongTimeout).subscribe(() => {
                    console.log(this.wsId, `=> Pong timeout - closing socket to reconnect`);
                    this.reconnect();
                });
                this.ws.ping();
            }
            else {
            }
        }
        catch (error) {
            console.error(this.wsId, `=> Failed to send WS ping`, error);
        }
    }
    onWsPing(event) {
        try {
            console.log(this.wsId, '=> Received ping, sending pong');
            if (typeof this.ws.pong === 'function') {
                this.ws.pong();
            }
            else {
            }
        }
        catch (error) {
            console.error(this.wsId, `=> Failed to send WS pong`, error);
        }
    }
    onWsPong(event) {
        console.log(this.wsId, '=> Received pong, clearing timer');
        if (this.pongTimer) {
            this.pongTimer.unsubscribe();
        }
    }
    onWsMessage(event) {
        const data = this.parseWsMessage(event);
        this.emit('message', data);
        switch (this.discoverEventType(data)) {
            case 'welcome':
                this.connectId = data.id;
                console.log(this.wsId, '=> connectId:', this.connectId);
                break;
            case 'symbolTicker':
            case 'symbolTickerV2':
            case 'orderUpdate':
            case 'balanceUpdate':
            case 'withdrawHold':
            case 'positionChange':
            case 'fundingSettlement':
            case 'riskLimitChange':
                this.emitTopicEvent(data);
                break;
            default:
                console.log('onWsMessage =>', data);
                console.log(JSON.stringify(data));
        }
    }
    parseWsMessage(event) {
        if (typeof event === 'string') {
            const parsedEvent = JSON.parse(event);
            if (parsedEvent.data) {
                return this.parseWsMessage(parsedEvent.data);
            }
        }
        return (event === null || event === void 0 ? void 0 : event.data) ? JSON.parse(event.data) : event;
    }
    discoverEventType(data) {
        const obj = Array.isArray(data) ? (data.length ? data[0] : undefined) : data;
        if (typeof obj === 'object') {
            if (Object.keys(obj).length === 2 && obj.hasOwnProperty('id') && obj.hasOwnProperty('type')) {
                return obj.type;
            }
            else if (obj.hasOwnProperty('topic')) {
                const { topic, subject } = obj;
                if (topic === `/contractMarket/ticker` || topic.startsWith(`/contractMarket/ticker:`)) {
                    return 'symbolTicker';
                }
                else if (topic.startsWith(`/contractMarket/tickerV2`)) {
                    return 'symbolTickerV2';
                }
                else if (topic.startsWith(`/contractMarket/tradeOrders`)) {
                    return 'orderUpdate';
                }
                else if (topic === '/contractAccount/wallet' && subject === 'availableBalance.change') {
                    return 'balanceUpdate';
                }
                else if (topic === '/contractAccount/wallet' && subject === 'withdrawHold.change') {
                    return 'withdrawHold';
                }
                else if (topic.startsWith('/contract/position') && subject === 'position.change') {
                    return 'positionChange';
                }
                else if (topic.startsWith('/contract/position') && subject === 'position.settlement') {
                    return 'fundingSettlement';
                }
                else if (topic.startsWith('/contract/position') && subject === 'position.adjustRiskLimit') {
                    return 'riskLimitChange';
                }
            }
        }
        return undefined;
    }
    symbolTicker(symbol) {
        const topic = `/contractMarket/ticker:${symbol}`;
        const subject = `ticker`;
        return this.registerTopicSubscription(topic, subject);
    }
    symbolTickerV2(symbol) {
        const topic = `/contractMarket/tickerV2:${symbol}`;
        const subject = `tickerV2`;
        return this.registerTopicSubscription(topic, subject);
    }
    orderUpdate() {
        const topic = `/spotMarket/tradeOrders`;
        const subject = `orderChange`;
        return this.registerTopicSubscription(topic, subject);
    }
    balanceUpdate() {
        const topic = `/contractAccount/wallet`;
        const subject = `availableBalance.change`;
        return this.registerTopicSubscription(topic, subject);
    }
    withdrawHold() {
        const topic = `/contractAccount/wallet`;
        const subject = `withdrawHold.change`;
        return this.registerTopicSubscription(topic, subject);
    }
    positionChange(symbol) {
        const topic = `/contract/position:${symbol}`;
        const subject = `position.change`;
        return this.registerTopicSubscription(topic, subject);
    }
    fundingSettlement(symbol) {
        const topic = `/contract/position:${symbol}`;
        const subject = `position.settlement`;
        return this.registerTopicSubscription(topic, subject);
    }
    riskLimitChange(symbol) {
        const topic = `/contract/position:${symbol}`;
        const subject = `position.adjustRiskLimit`;
        return this.registerTopicSubscription(topic, subject);
    }
    registerTopicSubscription(topic, subject) {
        const topicKey = subject ? `${topic}#${subject}` : topic;
        const stored = this.emitters[topicKey];
        if (stored) {
            return stored;
        }
        const created = new rxjs_1.Subject();
        this.emitters[topicKey] = created;
        if (this.status === 'connected') {
            this.subscribeTopic(topic, subject);
        }
        return created;
    }
    respawnTopicSubscriptions() {
        const topics = [];
        Object.keys(this.emitters).map(topicKey => {
            const stored = this.emitters[topicKey];
            const [topic, subject] = topicKey.split('#');
            const hasSubscriptions = !this.isSubjectUnobserved(stored);
            if (hasSubscriptions) {
                this.subscribeTopic(topic, subject);
            }
            else {
                if (stored) {
                    stored.complete();
                }
                delete this.emitters[topicKey];
            }
        });
    }
    emitTopicEvent(event) {
        if (typeof event !== 'object' || !event.hasOwnProperty('topic')) {
            throw (`No s'ha pogut interpretar el tipus d'event`);
        }
        const topic = event.topic;
        const subject = event.subject;
        const topicKey = subject ? `${topic}#${subject}` : topic;
        const stored = this.emitters[topicKey];
        if (!stored) {
            return;
        }
        const hasSubscriptions = !this.isSubjectUnobserved(stored);
        if (hasSubscriptions) {
            stored.next(event);
        }
        else {
            this.unsubscribeTopic(topic, subject);
            if (stored) {
                stored.complete();
            }
            delete this.emitters[topicKey];
        }
    }
    isSubjectUnobserved(emitter) {
        var _a;
        return !emitter || emitter.closed || !((_a = emitter.observers) === null || _a === void 0 ? void 0 : _a.length);
    }
    subscribeTopic(topic, subject) {
        console.log(this.wsId, '=> subscribing...', { topic, subject });
        const id = ++this.subscriptionId;
        const data = { type: "subscribe", id, topic, response: true };
        if (subject) {
            data.subject = subject;
        }
        this.ws.send(JSON.stringify(data), error => error ? this.onWsError(error) : undefined);
    }
    unsubscribeTopic(topic, subject) {
        console.log(this.wsId, '=> unsubscribing...', { topic, subject });
        const id = ++this.subscriptionId;
        const data = { type: "unsubscribe", id, topic, response: true };
        if (subject) {
            data.subject = subject;
        }
        this.ws.send(JSON.stringify(data), error => error ? this.onWsError(error) : undefined);
    }
    get wsId() { return `${this.market}-${this.streamType}-ws`; }
}
exports.KucoinWebsocket = KucoinWebsocket;
//# sourceMappingURL=kucoin-websocket.js.map