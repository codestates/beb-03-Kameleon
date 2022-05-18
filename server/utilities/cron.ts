import { updateStockPrice } from "./updatePrice";
import { multiMint } from "./mintToLPs";
import { checkBulkPoolLiquidity } from "./poolLiquidity";
const CronJob = require("cron").CronJob;

const startCron = () => {
  // 주식가격 받은 후 갱신
  const updateStockPriceCron = new CronJob("*/30 * * * * *", updateStockPrice);
  updateStockPriceCron.start();

  // 테스트용 코드
  // const mintToLPs = new CronJob("*/5 * * * * *", multiMint);

  // 24시간에 한번 민팅
  const mintToLPsCron = new CronJob("0 0 */1 * * *", multiMint);
  mintToLPsCron.start();

  const checkPoolLiquidityCron = new CronJob(
    "0 0 */1 * * *",
    checkBulkPoolLiquidity
  );
  checkPoolLiquidityCron.start();
};

export { startCron };
