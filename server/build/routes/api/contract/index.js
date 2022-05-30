"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var contract_controller_1 = require("../../controller/contract.controller");
var router = (0, express_1.Router)();
// router.post("/mintStockToken", mintStockToken_controller);
// router.get("/list", addressList_controller);
router.post("/getPoolLiquidity", contract_controller_1.getPoolLiquidity_controller);
router.get("/getPoolRoi", contract_controller_1.getPoolRoi_controller);
exports.default = router;
//# sourceMappingURL=index.js.map