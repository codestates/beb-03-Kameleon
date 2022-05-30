"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoiList_service = exports.getPoolLiquidity_service = exports.recordBulkPoolLiquidity_service = exports.recordPoolLiquidity_service = void 0;
var PoolLiquidity_1 = require("../typeorm/entity/PoolLiquidity");
var typeorm_1 = require("typeorm");
var uuid_1 = require("uuid");
var recordPoolLiquidity_service = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var address, poolSize, poolLiquidity, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                address = data.address, poolSize = data.poolSize;
                console.log(address, poolSize);
                poolLiquidity = PoolLiquidity_1.PoolLiquidity.create({
                    poolSize: poolSize,
                    address: address,
                });
                return [4 /*yield*/, poolLiquidity.save()];
            case 1:
                _a.sent();
                return [2 /*return*/, true];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.recordPoolLiquidity_service = recordPoolLiquidity_service;
var recordBulkPoolLiquidity_service = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, typeorm_1.getConnection)()
                        .createQueryBuilder()
                        .insert()
                        .into(PoolLiquidity_1.PoolLiquidity)
                        .values(__spreadArray([], data.map(function (v) { return (__assign(__assign({}, v), { uuid: (0, uuid_1.v4)() })); }), true))
                        .execute()];
            case 1:
                _a.sent();
                return [2 /*return*/, true];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.recordBulkPoolLiquidity_service = recordBulkPoolLiquidity_service;
var getPoolLiquidity_service = function (_a) {
    var exchangeAddress = _a.exchangeAddress;
    return __awaiter(void 0, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, typeorm_1.getConnection)()
                            .getRepository(PoolLiquidity_1.PoolLiquidity)
                            .createQueryBuilder("poolLiquidity")
                            .where("address = :address", { address: exchangeAddress })
                            .getMany()];
                case 1:
                    data = _b.sent();
                    console.log(data);
                    return [2 /*return*/, {
                            success: true,
                            data: data,
                        }];
                case 2:
                    error_1 = _b.sent();
                    console.log(error_1);
                    return [2 /*return*/, {
                            success: true,
                            data: null,
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getPoolLiquidity_service = getPoolLiquidity_service;
var getRoiList_service = function (_a) {
    var _b = _a.limit, limit = _b === void 0 ? 1 : _b, exchangeAddress = _a.exchangeAddress;
    return __awaiter(void 0, void 0, void 0, function () {
        var first, last, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, typeorm_1.getConnection)()
                            .getRepository(PoolLiquidity_1.PoolLiquidity)
                            .createQueryBuilder("poolLiquidity")
                            .where("address = :exchangeAddress", { exchangeAddress: exchangeAddress })
                            .orderBy("poolLiquidity.index", "ASC")
                            .limit(limit)
                            .getOne()];
                case 1:
                    first = _c.sent();
                    return [4 /*yield*/, (0, typeorm_1.getConnection)()
                            .getRepository(PoolLiquidity_1.PoolLiquidity)
                            .createQueryBuilder("poolLiquidity")
                            .where("address = :exchangeAddress", { exchangeAddress: exchangeAddress })
                            .orderBy("poolLiquidity.index", "DESC")
                            .limit(limit)
                            .getOne()];
                case 2:
                    last = _c.sent();
                    console.log(first, last);
                    return [2 /*return*/, {
                            success: true,
                            data: { first: first, last: last },
                        }];
                case 3:
                    error_2 = _c.sent();
                    console.log(error_2);
                    return [2 /*return*/, {
                            success: true,
                            data: null,
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.getRoiList_service = getRoiList_service;
//# sourceMappingURL=contract.service.js.map