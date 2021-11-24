"use strict";
//----------------------------------------------------------------
// TEST SERVER
//----------------------------------------------------------------
const express = require('express');
const router = require('../router');
const cors = require('cors');
const { CLIENT_CORS_URL } = process.env;
const corsConfig = { origin: [CLIENT_CORS_URL] };
// NB server is started in test files
// import and call createServer()
function createServer() {
    const app = express();
    app.use(cors(corsConfig));
    app.use(express.json());
    app.use(router);
    return app;
}
module.exports = createServer;
//# sourceMappingURL=test-app.js.map