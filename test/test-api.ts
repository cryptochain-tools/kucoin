import * as fs from 'fs';

import { KucoinApiSpot } from '../src/kucoin-api-spot';
import { KucoinApiFutures } from '../src/kucoin-api-futures';
import { KucoinApiOptions, KucoinMarketType } from '../src/types/kucoin.types';

import { getApiKeys, setTestKeys } from './api-keys';

/**
 * ```bash
 * npx ts-node test/test-api.ts
 * ```
 */

const testApi = async () => {
  try {
    
    console.log('---------------- API TEST ----------------------');
 
    const market: KucoinMarketType = 'spot';
    // const market: KucoinMarketType = 'futures';

    const options: KucoinApiOptions = {
      credentials: { ...getApiKeys(market) },
      // isTest: true,
    };

    if (options.isTest) { setTestKeys(options, market); }

    const api = (market as any) === 'spot' ? new KucoinApiSpot(options) : new KucoinApiFutures(options);
    

    // ---------------------------------------------------------------------------------------------------
    //  Websocket (Spot)
    // ---------------------------------------------------------------------------------------------------
    
    // console.log('getWebsocketToken() =>', await api.getWebsocketToken('public'));
    // console.log('getWebsocketToken() =>', await api.getWebsocketToken('private'));

    
    if (api instanceof KucoinApiSpot) {

      // ---------------------------------------------------------------------------------------------------
      //  Market (Spot)
      // ---------------------------------------------------------------------------------------------------

      // console.log('getMarketsList() =>', await api.getMarketsList());
      
      // console.log('getSymbolsList() =>', await api.getSymbolsList());
      // console.log('getSymbolsList({ market }) =>', await api.getSymbolsList({ market: 'USDS' }));
      
      // console.log('getSymbolKlines({ market }) =>', await api.getSymbolKlines({ symbol: 'BNB-USDT', type: '1hour' }));

      // ---------------------------------------------------------------------------------------------------
      //  Account (Spot)
      // ---------------------------------------------------------------------------------------------------
      
      // console.log('getUserInfo() =>', await api.getUserInfo());
      
      // console.log('getAccountsList() =>', await api.getAccountsList());
      
      // console.log('getAccountInformation(accountId) =>', await api.getAccountInformation('62272237c6c8070001d9ec84'));

      // ---------------------------------------------------------------------------------------------------
      //  Orders (Spot)
      // ---------------------------------------------------------------------------------------------------
      
      // console.log('getOrders({ tradeType }) =>', await api.getOrders({ } as any));
      // console.log('getOrders({ tradeType }) =>', await api.getOrders({ tradeType: 'TRADE', startAt: 1651269600, endAt: 1648764000 }));
      
      // console.log('getRecentOrders() =>', await api.getRecentOrders());

      // console.log('getFills({ tradeType }) =>', await api.getFills({ tradeType: 'TRADE' }));
      // console.log('getFills({ tradeType }) =>', await api.getFills({ tradeType: 'TRADE', startAt: 1761269600000, endAt: 1108764000000 }));
      
      // console.log('getRecentFills() =>', await api.getRecentFills());
      
    } else if (api instanceof KucoinApiFutures) {

      // ---------------------------------------------------------------------------------------------------
      //  Market (Futures)
      // ---------------------------------------------------------------------------------------------------

      // console.log('getActiveSymbols() =>', await api.getActiveSymbols());
      
      // console.log('getSymbolInformation(symbol) =>', await api.getSymbolInformation('ENJUSDTM'));
      
      // console.log('getSymbolPriceTicker({ symbol }) =>', await api.getSymbolPriceTicker({ symbol: 'BNBUSDTM' }).catch(err => { throw err; }));

      // ---------------------------------------------------------------------------------------------------
      //  Account (Spot)
      // ---------------------------------------------------------------------------------------------------
      
      // console.log('getAccountOverview() =>', await api.getAccountOverview());
      // console.log('getAccountOverview({ currency }) =>', await api.getAccountOverview({ currency: 'BTC' }));
      
      // console.log('getPositions() =>', await api.getPositions());
      // console.log('getPosition({ symbol }) =>', await api.getPosition({ symbol: 'ENJUSDTM' }));
      
      // console.log('getRiskLimitLevel({ symbol }) =>', await api.getRiskLimitLevel('ENJUSDTM'));
      
      // ---------------------------------------------------------------------------------------------------
      //  Orders (Futures)
      // ---------------------------------------------------------------------------------------------------
      
      // console.log('getFills() =>', await api.getFills());
      // console.log('getFills() =>', await api.getFills({ startAt: 1648764000, endAt: 1651269600 }));
      
      // console.log('getRecentFills() =>', await api.getRecentFills());
      
      // console.log('getOrders() =>', await api.getOrders());
    }


  } catch (error) {
    console.error('API ERROR', error);
  }
};

testApi();
