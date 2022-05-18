import * as fs from 'fs';

import { KucoinMarketType } from '../src/types/kucoin.types';
import { KucoinWebsocketOptions } from '../src/types/kucoin-websocket.types';
import { KucoinWebsocket } from '../src';

import { getApiKeys } from './api-keys';
import { writeLog } from './log/write-log';


/**
 * ```bash
 * npx ts-node test/test-ws-user.ts
 * ```
 */
const testUserWs = async () => {
  try {

    console.log('---------------- User WebSocket TEST ----------------------');
 
    const market: KucoinMarketType = 'spot';
    // const market: KucoinMarketType = 'futures';

    const options: KucoinWebsocketOptions = {
      streamType: 'user',
      market: market,
      credentials: { ...getApiKeys(market) },
      // isTest: true,
    };

    console.log('options =>', options);
    
    const ws = new KucoinWebsocket(options);

    // ws.addListener('message', msg => console.log('message =>', msg));

    const balanceUpdate = ws.balanceUpdate().subscribe(data => writeLog('exemple_balanceUpdate_', data));
    const orderUpdate = ws.orderUpdate().subscribe(data => writeLog('exemple_orderUpdate_', data));
    const withdrawHold = ws.withdrawHold().subscribe(data => writeLog('exemple_withdrawHold_', data));
    const positionChange = ws.positionChange('XBTUSDM').subscribe(data => writeLog('exemple_positionChange_', data));
    const fundingSettlement = ws.fundingSettlement('XBTUSDM').subscribe(data => writeLog('exemple_fundingSettlement_', data));
    const riskLimitChange = ws.riskLimitChange('XBTUSDM').subscribe(data => writeLog('exemple_riskLimitChange_', data));

    
    // setTimeout(() => { console.log('Test => Unsubscribe balanceUpdate'); balanceUpdate.unsubscribe(); }, 50000);
    // setTimeout(() => { console.log('Test => Unsubscribe orderUpdate'); orderUpdate.unsubscribe(); }, 50000);
    // setTimeout(() => { console.log('Test => Unsubscribe withdrawHold'); withdrawHold.unsubscribe(); }, 50000);
    // setTimeout(() => { console.log('Test => Unsubscribe positionChange'); positionChange.unsubscribe(); }, 50000);
    // setTimeout(() => { console.log('Test => Unsubscribe fundingSettlement'); fundingSettlement.unsubscribe(); }, 50000);
    // setTimeout(() => { console.log('Test => Unsubscribe riskLimitChange'); riskLimitChange.unsubscribe(); }, 50000);

    // setTimeout(() => { console.log('Reconnecting...'); ws.reconnect(); }, 10000);

  } catch (error) {
    console.error('Websocket ERROR', error);
  }
};

testUserWs();
