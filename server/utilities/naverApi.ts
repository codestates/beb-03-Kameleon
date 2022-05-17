//https://polling.finance.naver.com/api/realtime?query=SERVICE_ITEM:005930,051600

import axios from "axios";
import { callContract } from "./KAS";

const stockPrice = async () => {
  try {
    const stocklist: Array<string> = await callContract({
      contractName: "Oracle",
      contractAddress: process.env.Oracle_CONTRACT_ADDRESS,
      methodName: "getStockCodeList",
    });
    console.log(stocklist);
    const res = await axios(
      `https://polling.finance.naver.com/api/realtime?query=SERVICE_ITEM:${stocklist.join(
        ","
      )}`
    );
    const datas = res?.data?.result?.areas[0]?.datas;
    if (datas !== undefined) {
      const result = datas.map(
        ({ cd: codeNumber, nv: nowValue }: { cd: string; nv: number }) => ({
          codeNumber,
          nowValue,
        })
      );
      return result;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { stockPrice };
