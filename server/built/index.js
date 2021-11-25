"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const cors_1 = __importDefault(require("cors"));
// TODO: refactor use of db
require('dotenv').config();
const db = require('./model/dbaccess.js');
const corsConfig = { origin: ['http://localhost:3000'] };
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app
    .use((0, cors_1.default)(corsConfig))
    .use(express_1.default.json())
    .use((req, res, next) => {
    console.log(`${req.method} request received for URL: ${req.url}`);
    next();
})
    .use(router_1.default);
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map