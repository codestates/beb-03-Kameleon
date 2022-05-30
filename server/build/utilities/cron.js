"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCron = void 0;
var updatePrice_1 = require("./updatePrice");
var mintToLPs_1 = require("./mintToLPs");
var poolLiquidity_1 = require("./poolLiquidity");
var CronJob = require("cron").CronJob;
var startCron = function () {
    // 주식가격 받은 후 갱신
    var updateStockPriceCron = new CronJob("*/30 * * * * *", updatePrice_1.updateStockPrice);
    updateStockPriceCron.start();
    // 테스트용 코드
    // const mintToLPs = new CronJob("*/5 * * * * *", multiMint);
    // 24시간에 한번 민팅
    var mintToLPsCron = new CronJob("0 0 */1 * * *", mintToLPs_1.multiMint);
    mintToLPsCron.start();
    var checkPoolLiquidityCron = new CronJob("0 0 */1 * * *", 
    // "*/5 * * * * *",
    poolLiquidity_1.checkBulkPoolLiquidity);
    checkPoolLiquidityCron.start();
};
exports.startCron = startCron;
//# sourceMappingURL=cron.js.map