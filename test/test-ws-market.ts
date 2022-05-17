import * as fs from 'fs';

import { KucoinApiSpot } from '../src/kucoin-api-spot';
import { KucoinApiFutures } from '../src/kucoin-api-futures';
import { KucoinApiOptions, KucoinMarketType } from '../src/types/kucoin.types';
import { KucoinWebsocketOptions } from '../src/types/kucoin-websocket.types';
import { KucoinWebsocket } from '../src';


/**
 * ```bash
 * npx ts-node test/test-ws-market.ts
 * ```
 */

const testMarketWs = async () => {
  try {

    console.log('---------------- Market WebSocket TEST ----------------------');
 
    const market: KucoinMarketType = 'spot';
    // const market: KucoinMarketType = 'usdm';

    const options: KucoinWebsocketOptions = {
      streamType: 'market',
      market: market,
      // isTest: true,
    };
    
    const ws = new KucoinWebsocket(options);

    // ws.addListener('message', msg => console.log('message =>', msg));

    const tickerXBTUSDM = ws.symbolTicker('XBTUSDM').subscribe(data => console.log('symbolTicker =>', data));
    
    setTimeout(() => { console.log('Test => Unsubscribe XBTUSDM ticker'); tickerXBTUSDM.unsubscribe(); }, 50000);    
    // setTimeout(() => { console.log('Reconnecting...'); ws.reconnect(); }, 10000);
    // setTimeout(() => { console.log('Subscribing to orderUpdate...'); ws.orderUpdate(); }, 10000);

  } catch (error) {
    console.error('Websocket ERROR', error);
  }
};

testMarketWs();
