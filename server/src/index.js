const Express = require('express');
const router = require('./router');
const cors = require('cors');

require('dotenv').config();
const db = require('./model/dbaccess.js');
const corsConfig = {origin: ['http://localhost:3000']};

const app = Express();
const PORT = process.env.PORT;

app
	.use(cors(corsConfig))
	.use(Express.json())
	.use(router)

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});