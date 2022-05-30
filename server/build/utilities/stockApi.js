"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataFromStockCode = void 0;
var winax = require("winax");
var objCpCybos = new winax.Object("CpUtil.CpCybos.1", {
    activate: true,
});
var connectState = objCpCybos.IsConnect;
if (connectState === 0) {
    console.log("연결 안됨");
}
else {
    console.log("연결 됨");
}
var objStockMst = new winax.Object("Dscbo1.StockMst", {
    activate: true,
});
var _setStockCode = function (stockCode) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, objStockMst.SetInputValue(0, stockCode)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var _blockRequest = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, objStockMst.BlockRequest()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var _getStockDataFromCode = function () { return __awaiter(void 0, void 0, void 0, function () {
    var stockObj;
    return __generator(this, function (_a) {
        stockObj = {
            code: objStockMst.GetHeaderValue(0),
            name: objStockMst.GetHeaderValue(1),
            time: objStockMst.GetHeaderValue(4),
            cprice: objStockMst.GetHeaderValue(11),
            diff: objStockMst.GetHeaderValue(12),
            open: objStockMst.GetHeaderValue(13),
            high: objStockMst.GetHeaderValue(14),
            low: objStockMst.GetHeaderValue(15),
            offer: objStockMst.GetHeaderValue(16),
            bid: objStockMst.GetHeaderValue(17),
            vol: objStockMst.GetHeaderValue(18),
            vol_value: objStockMst.GetHeaderValue(19), // 거래대금
        };
        return [2 /*return*/, stockObj];
    });
}); };
var getDataFromStockCode = function (stockCode) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _setStockCode(stockCode)];
            case 1:
                _a.sent();
                return [4 /*yield*/, _blockRequest()];
            case 2:
                _a.sent();
                return [4 /*yield*/, _getStockDataFromCode()];
            case 3:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
exports.getDataFromStockCode = getDataFromStockCode;
//# sourceMappingURL=stockApi.js.map