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
exports.connections = void 0;
var typeorm_1 = require("typeorm");
var typeorm_extension_1 = require("typeorm-extension");
exports.connections = undefined;
var connection = {
    createDatabase: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // ormconfig.js 의 database이름으로 database 생성
                    return [4 /*yield*/, (0, typeorm_extension_1.createDatabase)({
                            ifNotExist: true,
                            charset: "utf8mb4_general_ci",
                            characterSet: "utf8mb4",
                        })];
                    case 1:
                        // ormconfig.js 의 database이름으로 database 생성
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    create: function (option) {
        if (option === void 0) { option = null; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, typeorm_1.createConnections)()];
                    case 1:
                        // typeorm 연결
                        exports.connections = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    close: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // typerom 연결 삭제
                    return [4 /*yield*/, (0, typeorm_1.getConnection)().close()];
                    case 1:
                        // typerom 연결 삭제
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    clear: function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, entities;
            var _this = this;
            return __generator(this, function (_a) {
                connection = (0, typeorm_1.getConnection)();
                entities = connection.entityMetadatas;
                entities.forEach(function (entity) { return __awaiter(_this, void 0, void 0, function () {
                    var repository;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                repository = connection.getRepository(entity.name);
                                return [4 /*yield*/, repository.query("DELETE FROM " + entity.tableName)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    },
};
exports.default = connection;
//# sourceMappingURL=connection.js.map