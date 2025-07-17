const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');

const env = process.env.NODE_ENV || 'local';
dotenv.config({ path: path.resolve(__dirname, `../config/env/.env.${env}`) });

const logger = {
  info: (msg) => console.log(`[SQL] ${msg}`),
};

const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_PORT,
  DB_TIMEZONE,
  NODE_ENV
} = process.env;
console.log(`Connecting to database: ${DB_NAME} at ${DB_HOST}:${DB_PORT}`)

const shouldLogSQL = ['production'].includes(NODE_ENV);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  password: DB_PASS,
  dialect: 'mysql',
  timezone: DB_TIMEZONE || '+00:00',
  logging: shouldLogSQL ? (msg) => logger.info(msg) : false,
  pool: {
    max: 20,
    min: 5,
    idle: 10000,
    acquire: 30000,
    evict: 1000
  },
  dialectOptions: {
    connectTimeout: 10000,
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
