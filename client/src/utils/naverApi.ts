//https://polling.finance.naver.com/api/realtime?query=SERVICE_ITEM:005930,051600

import axios from 'axios';
import { callContract } from './KAS';
import { contractAddressTable } from './../constants';

const stockPrice = async () => {
  try {
    const stocklist: Array<string> = await callContract({
      contractName: 'Oracle',
      contractAddress: contractAddressTable.Oracle,
      methodName: 'getStockCodeList',
    });
    // console.log('stocklist : ', stocklist);
    const res = await axios(
      `https://polling.finance.naver.com/api/realtime?query=SERVICE_ITEM:${stocklist.join(
        ','
      )}`
    );
    const datas = res?.data?.result?.areas[0]?.datas;
    if (datas !== undefined) {
      const result = datas.map(
        ({
          cd: codeNumber,
          nv: nowValue,
          nm: stockName,
        }: {
          cd: string;
          nv: number;
          nm: string;
        }) => ({
          codeNumber,
          nowValue,
          stockName,
        })
      );
      return result;
    } else {
      return [];
    }
  } catch (error) {
    // console.log(error);
    return [];
  }
};

export { stockPrice };
