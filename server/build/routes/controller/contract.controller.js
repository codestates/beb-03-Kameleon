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
exports.getPoolRoi_controller = exports.getPoolLiquidity_controller = exports.addressList_controller = exports.mintStockToken_controller = void 0;
var contract_service_1 = require("../../service/contract.service");
var poolLiquidity_1 = require("../../utilities/poolLiquidity");
var mintStockToken_controller = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
        }
        catch (err) {
            return [2 /*return*/, res.status(500).json({
                    success: false,
                    data: null,
                    error: err,
                })];
        }
        return [2 /*return*/];
    });
}); };
exports.mintStockToken_controller = mintStockToken_controller;
var addressList_controller = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
        }
        catch (err) {
            return [2 /*return*/, res.status(500).json({
                    success: false,
                    data: null,
                    error: err,
                })];
        }
        return [2 /*return*/];
    });
}); };
exports.addressList_controller = addressList_controller;
var getPoolLiquidity_controller = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var exchangeAddress, _a, success, data, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                exchangeAddress = req.body.exchange;
                return [4 /*yield*/, (0, contract_service_1.getPoolLiquidity_service)({
                        exchangeAddress: exchangeAddress,
                    })];
            case 1:
                _a = _b.sent(), success = _a.success, data = _a.data;
                if (success) {
                    return [2 /*return*/, res.status(200).json({
                            success: success,
                            data: data,
                            error: null,
                        })];
                }
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        data: null,
                        error: err_1,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPoolLiquidity_controller = getPoolLiquidity_controller;
var getPoolRoi_controller = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var exchangeAddress, data, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                exchangeAddress = req.query.exchangeAddress;
                return [4 /*yield*/, (0, contract_service_1.getRoiList_service)({ exchangeAddress: exchangeAddress })];
            case 1:
                data = (_a.sent()).data;
                result = (0, poolLiquidity_1.calcPoolRoi)(data);
                console.log(result);
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        data: result,
                        error: null,
                    })];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        data: null,
                        error: err_2,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPoolRoi_controller = getPoolRoi_controller;
//# sourceMappingURL=contract.controller.js.map