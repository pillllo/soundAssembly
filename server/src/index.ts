import Express from 'express';
import router from './router';
import cors from 'cors';

// TODO: refactor use of db
require('dotenv').config();
const db = require('./model/dbaccess.js');

const corsConfig = {origin: ['http://localhost:3000']};

const app = Express();
const PORT = process.env.PORT;

app
	.use(cors(corsConfig))
	.use(Express.json())
	.use((req, res, next) => {
		console.log(`${req.method} request received for URL: ${req.url}`);
		next();
	})
	.use(router)

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});