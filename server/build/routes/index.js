"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var router = require("express").Router();
var contract_1 = __importDefault(require("./api/contract"));
var stock_1 = __importDefault(require("./api/stock"));
router.use("/contract", contract_1.default);
router.use("/stock", stock_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map