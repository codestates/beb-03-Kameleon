//https://polling.finance.naver.com/api/realtime?query=SERVICE_ITEM:005930,051600

import axios from "axios";
import { sendContract, callContract } from "./KAS";

//https://polling.finance.naver.com/api/realtime?query=SERVICE_ITEM:
const stockPrice = async () => {
  const CronJob = require("cron").CronJob;
  const job = new CronJob("*/30 * * * * *", async () => {
    const contractAddress = "0x5e43A4c0De6B2fd707D3c60Ff9e0f3A7e2d793ab";
    const stocklist: Array<string> = await callContract({
      contractName: "Oracle",
      contractAddress,
      methodName: "getStockList",
    });
    console.log(stocklist);
    const res = await axios(
      `https://polling.finance.naver.com/api/realtime?query=SERVICE_ITEM:${stocklist.join(
        ","
      )}`
    );
    const result = res?.data?.result?.areas[0]?.datas.map(
      ({ cd: codeNumber, nv: nowValue }: { cd: string; nv: number }) => ({
        codeNumber,
        nowValue,
      })
    );
    await sendContract({
      contractName: "Oracle",
      contractAddress,
      methodName: "setOraclePrice",
    });
  });
  job.start();
};
export { stockPrice };
