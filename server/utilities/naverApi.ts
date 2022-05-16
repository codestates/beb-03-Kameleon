//https://polling.finance.naver.com/api/realtime?query=SERVICE_ITEM:005930,051600

import axios from "axios";
import { sendContract } from "./KAS";

//https://polling.finance.naver.com/api/realtime?query=SERVICE_ITEM:
const stockPrice = async () => {
  const CronJob = require("cron").CronJob;
  const job = new CronJob("*/30 * * * * *", async () => {
    const list = ["005930", "051600"];
    const res = await axios(
      `https://polling.finance.naver.com/api/realtime?query=SERVICE_ITEM:${list.join(
        ","
      )}`
    );
    console.log(
      ...res?.data?.result?.areas[0]?.datas.map(
        ({ cd: codeNumber, nv: nowValue }: { cd: string; nv: number }) => ({
          codeNumber,
          nowValue,
        })
      )
    );
    // const contractAddress = "";
    // await sendContract({
    //   contractName: "Oracle",
    //   contractAddress,
    //   methodName: "setOraclePrice",
    // });
  });
  job.start();
};
export { stockPrice };
