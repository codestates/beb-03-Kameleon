"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.byteCodeList = exports.abiList = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
// const contractPath =
//   process.env.NODE_ENV === "production"
//     ? "./../../../contract/contracts/artifacts"
//     : "./../../contract/contracts/artifacts";
var contractPath = process.env.NODE_ENV === "production"
    ? "./../../contracts/artifacts"
    : "./../contract/contracts/artifacts";
var abiList = {};
exports.abiList = abiList;
var byteCodeList = {};
exports.byteCodeList = byteCodeList;
fs_1.default.readdirSync(path_1.default.join(__dirname, contractPath))
    .filter(function (file) {
    return (file.indexOf(".") !== 0 &&
        file.slice(-14) !== "_metadata.json" &&
        file.slice(-5) === ".json");
})
    .forEach(function (file) {
    var _a, _b;
    var artifact = require(path_1.default.join(__dirname, contractPath, file));
    var abiName = file.slice(0, -5);
    abiList[abiName] = artifact === null || artifact === void 0 ? void 0 : artifact.abi;
    byteCodeList[abiName] = (_b = (_a = artifact === null || artifact === void 0 ? void 0 : artifact.data) === null || _a === void 0 ? void 0 : _a.bytecode) === null || _b === void 0 ? void 0 : _b.object;
});
//# sourceMappingURL=contractData.js.map