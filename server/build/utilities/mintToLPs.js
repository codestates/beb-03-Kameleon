"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiMint = void 0;
var contractAddress_1 = require("../constants/contractAddress");
var KAS_1 = require("./KAS");
var multiMint = function () {
    (0, KAS_1.sendContract)({
        contractName: "Kameleon",
        contractAddress: contractAddress_1.KameleonAddress,
        methodName: "mintToLPs",
    });
};
exports.multiMint = multiMint;
//# sourceMappingURL=mintToLPs.js.map