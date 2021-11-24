"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
require("./App.css");
// TODO: #15 write component files with capital letter
var Login_1 = __importDefault(require("./components/Login/Login"));
var Dashboard_1 = __importDefault(require("./components/Dashboard/Dashboard"));
function App() {
    // Code returned by spotify API during auth
    var code = new URLSearchParams(window.location.search).get('code');
    return code ? (0, jsx_runtime_1.jsx)(Dashboard_1.default, { code: code }, void 0) : (0, jsx_runtime_1.jsx)(Login_1.default, {}, void 0);
}
exports.default = App;
