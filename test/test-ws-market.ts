import * as fs from 'fs';

import { KucoinMarketType } from '../src/types/kucoin.types';
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
    // const market: KucoinMarketType = 'futures';

    const options: KucoinWebsocketOptions = {
      streamType: 'market',
      market: market,
      // isTest: true,
    };
    
    const ws = new KucoinWebsocket(options);

    // ws.addListener('message', msg => console.log('message =>', msg));

    const tickerXBTUSDM = ws.symbolTicker('XBTUSDM').subscribe(data => console.log('symbolTicker =>', data));
    const tickerV2XBTUSDM = ws.symbolTickerV2('XBTUSDM').subscribe(data => console.log('symbolTickerV2 =>', data));
    
    setTimeout(() => { console.log('Test => Unsubscribe XBTUSDM ticker'); tickerXBTUSDM.unsubscribe(); }, 50000);    
    setTimeout(() => { console.log('Test => Unsubscribe XBTUSDM tickerV2'); tickerV2XBTUSDM.unsubscribe(); }, 2500);    

    // setTimeout(() => { console.log('Reconnecting...'); ws.reconnect(); }, 10000);

  } catch (error) {
    console.error('Websocket ERROR', error);
  }
};

testMarketWs();
