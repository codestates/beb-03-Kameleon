"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var stock_controller_1 = require("../../controller/stock.controller");
var router = (0, express_1.Router)();
router.get("/getStocks", stock_controller_1.getStocks_controller);
exports.default = router;
//# sourceMappingURL=index.js.map