// require('dotenv').config();
const mongoose = require('mongoose');

const { DB_URL, DB_NAME } = process.env;
mongoose.connect(DB_URL, { dbName: DB_NAME });

const db = mongoose.connection;

db.on('error', () => console.log('error'));
db.once('open', () => console.log(`connected to MongoDB, database name: ${DB_NAME}`));

module.exports = db;