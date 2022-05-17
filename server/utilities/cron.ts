import { updateStockPrice, updateKlayPrice } from "./updatePrice";
const CronJob = require("cron").CronJob;

const startCron = () => {
  // 주식가격 받은 후 갱신
  const updateStockPriceCron = new CronJob("*/5 * * * * *", updateStockPrice);
  updateStockPriceCron.start();
  //   const updateKlaytnPriceCron = new CronJob("*/30 * * * * *", updateKlayPrice);
  //   updateKlaytnPriceCron.start();

  // 24시간에 한번 민팅
};

export { startCron };
