const dotenv = require('dotenv');
dotenv.config();

const { DB_HOST, DB_USER, DB_USER_PASSWORD, DB_NAME } = process.env;
const dbConfig = {
  host: DB_HOST || 'localhost',
  user: DB_USER ||   'root',
  password: DB_USER_PASSWORD || 'password',
  database: DB_NAME || 'classicmodels',
};

module.exports = { dbConfig };