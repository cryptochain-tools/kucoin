import * as fs from 'fs';

import { KucoinApiSpot } from '../src/kucoin-api-spot';
import { KucoinApiFutures } from '../src/kucoin-api-futures';
import { KucoinApiOptions, KucoinMarketType } from '../src/types/kucoin.types';
import { KucoinWebsocketOptions } from '../src/types/kucoin-websocket.types';
import { KucoinWebsocket } from '../src';
import { getApiKeys } from './api-keys';


/**
 * ```bash
 * npx ts-node test/test-ws-user.ts
 * ```
 */

/** Archivo donde se escribirá la salida. */
const logFilePath = 'results/ws-user.ts';

/** Escribe en el archivo `logFilePath`. */
function writeLog(variable: string, data: any) {
  const url = `./test/${logFilePath}`;
  const value = JSON.stringify(data, null, ' ');
  console.log(value);
  fs.appendFileSync(url, `const ${variable} = ${value};\n\n`);
}

const testMarketWs = async () => {
  try {

    console.log('---------------- User WebSocket TEST ----------------------');
 
    const market: KucoinMarketType = 'spot';
    // const market: KucoinMarketType = 'usdm';

    const options: KucoinWebsocketOptions = {
      streamType: 'user',
      market: market,
      ...getApiKeys(market),
      // isTest: true,
    };

    console.log('options =>', options);
    
    const ws = new KucoinWebsocket(options);

    // ws.addListener('message', msg => console.log('message =>', msg));

    const balanceUpdate = ws.balanceUpdate().subscribe(data => writeLog('exemple_balanceUpdate_', data));
    const orderUpdate = ws.orderUpdate().subscribe(data => writeLog('exemple_orderUpdate_', data));

    // ws.symbolTicker('XBTUSDM').subscribe(data => console.log(data));
    
    // setTimeout(() => { console.log('Test => Unsubscribe balanceUpdate'); balanceUpdate.unsubscribe(); }, 50000);    
    // setTimeout(() => { console.log('Test => Unsubscribe orderUpdate'); orderUpdate.unsubscribe(); }, 50000);    
    // setTimeout(() => { console.log('Reconnecting...'); ws.reconnect(); }, 10000);
    // setTimeout(() => { console.log('Subscribing to orderUpdate...'); ws.orderUpdate(); }, 10000);

  } catch (error) {
    console.error('Websocket ERROR', error);
  }
};

testMarketWs();
