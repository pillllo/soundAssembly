//----------------------------------------------------------------
// TEST SERVER
//----------------------------------------------------------------

console.log('This should be the first thing Jest does!')

const express = require('express');
const router = require('../router');
const cors = require('cors');

require('dotenv').config({ path: './.env.test'});
const { CLIENT_CORS_URL } = process.env;
console.log(`CLIENT_CORS_URL: ${CLIENT_CORS_URL}`)
const db = require('../model/dbaccess.js');
const corsConfig = { origin: [CLIENT_CORS_URL] };

function createServer () {
	const app = express();
	app.use(cors(corsConfig));
	app.use(express.json());
	app.use(router);
	return app;
}

module.exports = createServer;