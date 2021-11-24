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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var logoBlack_png_1 = __importDefault(require("../../assets/logoBlack.png"));
// require('dotenv').config();
function Login() {
    var params = new URLSearchParams({
        // client_id: process.env.CLIENT_ID,
        client_id: '51a951a7c87244e589bb80479176c075',
        response_type: 'code',
        redirect_uri: 'http://localhost:3000/',
        scope: 'user-read-private%20user-read-private%20user-top-read%20user-follow-read%20user-follow-modify%20user-library-read',
    });
    var base_url = 'https://accounts.spotify.com/authorize?';
    var auth = base_url + params;
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "login" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "login-form" }, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("img", { src: logoBlack_png_1.default, alt: "logo" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("h3", { children: "Organize your music library" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("p", { children: "Import your Spotify followed artists and organize them to your liking" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: auth }, { children: "log in with spotify" }), void 0) }, void 0) }, void 0)] }), void 0) }), void 0));
}
exports.default = Login;
