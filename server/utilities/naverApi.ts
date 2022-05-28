//https://polling.finance.naver.com/api/realtime?query=SERVICE_ITEM:005930,051600

import axios from "axios";
import { callContract } from "./KAS";
import iconv from "iconv-lite";
import { OracleAddress } from "../constants/contractAddress";

const stockPrice = async () => {
  try {
    const stocklist: Array<string> = await callContract({
      contractName: "Oracle",
      contractAddress: OracleAddress,
      methodName: "getStockCodeList",
    });
    console.log(stocklist);
    const uri = `https://polling.finance.naver.com/api/realtime?query=SERVICE_ITEM:${stocklist.join(
      ","
    )}`;
    const html = await axios.get(uri, {
      responseType: "arraybuffer",
    });
    const result = iconv.decode(html.data, "EUC-KR").toString();
    const datas = JSON.parse(result).result.areas[0].datas;
    console.log(datas);
    if (datas !== undefined) {
      const result = datas.map(
        ({
          cd: codeNumber,
          nv: nowValue,
          nm,
        }: {
          cd: string;
          nv: number;
          nm: string;
        }) => ({
          codeNumber,
          nowValue,
          stockName: nm,
        })
      );
      console.log(result);
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
