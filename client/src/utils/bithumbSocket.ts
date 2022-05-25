import { useState, useEffect } from 'react';
import axios from 'axios';
// WebSocket Ticker 데이터 가져오기
// 사용되는 곳 CoinMarket
export const useKlaySocket = (): string => {
  const [wsInstance, setWsInstance] = useState('');

  useEffect(() => {
    const ws = new WebSocket('wss://pubwss.bithumb.com/pub/ws');

    let klaytnPrice = undefined;
    const getDefaultPrice = async () => {
      const result = await axios.get(
        'https://api.bithumb.com/public/ticker/KLAY_KRW'
      );
      klaytnPrice = result?.data?.data?.closing_price;
      setWsInstance(klaytnPrice);
    };
    if (klaytnPrice === undefined) {
      getDefaultPrice();
    }

    ws.onopen = () => {
      const request = {
        type: 'ticker',
        symbols: ['KLAY_KRW'],
        tickTypes: ['30M'],
      };
      ws.send(JSON.stringify(request));
    };

    ws.onmessage = (e: { data: Iterable<number> }) => {
      const data = JSON.parse(e.data.toString());
      klaytnPrice = data?.content?.closePrice;
      if (klaytnPrice !== undefined) {
        setWsInstance(klaytnPrice);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return wsInstance;
};
