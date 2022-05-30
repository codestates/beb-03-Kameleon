"use strict";
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
var express_1 = __importDefault(require("express"));
require("reflect-metadata");
var routes_1 = __importDefault(require("../routes"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var hpp_1 = __importDefault(require("hpp"));
var helmet_1 = __importDefault(require("helmet"));
var path_1 = __importDefault(require("path"));
// import options from '../swagger.option'
// import swaggerUi from 'swagger-ui-express';
// import swaggerJsdoc from 'swagger-jsdoc';
var server = (0, express_1.default)();
// if (process.env.NODE_ENV !== 'production') {
//     server.use(cors({
//         origin: '*'
//     }));
// }
server.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
// const swaggerSpec = swaggerJsdoc(options);
// server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
require("dotenv").config();
server.use((0, cookie_parser_1.default)());
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: false }));
server.use(express_1.default.json());
server.use((0, morgan_1.default)(process.env.NODE_ENV === "production" ? "combined" : "dev"));
server.use((0, hpp_1.default)());
server.use((0, helmet_1.default)({ contentSecurityPolicy: false }));
// server.use(express.static('uploads'));
// server.use(express.static(path.join(__dirname, '../public')))
server.use("/api", routes_1.default);
var basePath = [__dirname, "../"];
if (process.env.NODE_ENV !== "production") {
    basePath.push("build/");
}
if (process.env.NODE_ENV_DEV === "true") {
    basePath.push("build/");
}
server.use(express_1.default.static(path_1.default.join.apply(path_1.default, __spreadArray(__spreadArray([], basePath, false), ["dist"], false))));
server.get("/*", function (req, res) {
    res.sendFile(path_1.default.join.apply(path_1.default, __spreadArray(__spreadArray([], basePath, false), ["dist", "index.html"], false)));
});
exports.default = server;
//# sourceMappingURL=express.js.map