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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalance = exports.sendContract = exports.callContract = exports.deployContract = exports.caver = void 0;
var caver_js_1 = __importDefault(require("caver-js"));
require("dotenv").config();
exports.caver = new caver_js_1.default("https://api.baobab.klaytn.net:8651");
var contractData_1 = require("./contractData");
var deployerKeyring = exports.caver.wallet.keyring.create(process.env.FEE_ADDRESS, process.env.FEE_PRIVATEKEY);
exports.caver.wallet.add(deployerKeyring);
var deployContract = function (_a) {
    var contractName = _a.contractName, _b = _a.parameters, parameters = _b === void 0 ? [] : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var contract, delployedContract, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    if (contractName === undefined)
                        throw "Not enough arguments";
                    contract = exports.caver.contract.create(contractData_1.abiList[contractName]);
                    return [4 /*yield*/, contract.deploy.apply(contract, __spreadArray([{
                                from: deployerKeyring.address,
                                gas: 5000000,
                            },
                            contractData_1.byteCodeList[contractName]], parameters, false))];
                case 1:
                    delployedContract = _c.sent();
                    console.log("The address of deployed smart contract: " + delployedContract.options.address);
                    return [2 /*return*/, delployedContract.options.address];
                case 2:
                    error_1 = _c.sent();
                    console.log(error_1);
                    return [2 /*return*/, error_1];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.deployContract = deployContract;
var callContract = function (_a) {
    var contractName = _a.contractName, contractAddress = _a.contractAddress, methodName = _a.methodName, _b = _a.parameters, parameters = _b === void 0 ? [] : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var contract, callResult, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    if (contractName === undefined ||
                        contractAddress === undefined ||
                        methodName === undefined)
                        throw "Not enough arguments";
                    contract = exports.caver.contract.create(contractData_1.abiList[contractName], contractAddress);
                    return [4 /*yield*/, contract.call.apply(contract, __spreadArray([methodName], parameters, false))];
                case 1:
                    callResult = _c.sent();
                    console.log("Result of calling " + methodName + " with key: " + callResult);
                    return [2 /*return*/, callResult];
                case 2:
                    error_2 = _c.sent();
                    console.log(error_2);
                    return [2 /*return*/, error_2];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.callContract = callContract;
var sendContract = function (_a) {
    var contractName = _a.contractName, contractAddress = _a.contractAddress, methodName = _a.methodName, _b = _a.parameters, parameters = _b === void 0 ? [] : _b, _c = _a.value, value = _c === void 0 ? undefined : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        var contract, receipt, error_3;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    if (contractName === undefined ||
                        contractAddress === undefined ||
                        methodName === undefined)
                        throw "Not enough arguments";
                    contract = exports.caver.contract.create(contractData_1.abiList[contractName], contractAddress);
                    return [4 /*yield*/, contract.send.apply(contract, __spreadArray([{
                                from: deployerKeyring.address,
                                gas: 3000000,
                                // value,
                            },
                            methodName], parameters, false))];
                case 1:
                    receipt = _d.sent();
                    console.log(receipt === null || receipt === void 0 ? void 0 : receipt.blockHash);
                    return [2 /*return*/, receipt];
                case 2:
                    error_3 = _d.sent();
                    console.log(error_3);
                    return [2 /*return*/, error_3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.sendContract = sendContract;
// const multiMint = () => {
//   const CronJob = require("cron").CronJob;
//   const job = new CronJob("0 0 */1 * * *", function () {
//     sendContract({
//       contractName: "MyKIP7",
//       contractAddress: "",
//       methodName: "multiMint",
//     });
//   });
//   job.start();
// };
var getBalance = function (_a) {
    var address = _a.address;
    return __awaiter(void 0, void 0, void 0, function () {
        var balance, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, exports.caver.klay.getBalance(address)];
                case 1:
                    balance = _b.sent();
                    return [2 /*return*/, balance];
                case 2:
                    error_4 = _b.sent();
                    console.log(error_4);
                    return [2 /*return*/, ""];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getBalance = getBalance;
//# sourceMappingURL=KAS.js.map