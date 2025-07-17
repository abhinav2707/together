const dotenv = require('dotenv');
const path = require('path');

const env = process.env.NODE_ENV || 'local';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

const ENV = process.env;

module.exports = {
  env,
  isProd: env === 'production',
  isDev: env === 'development' || env === 'local',
  db: {
    name: ENV.DB_NAME,
    user: ENV.DB_USER,
    pass: ENV.DB_PASS,
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    timezone: ENV.DB_TIMEZONE || '+00:00',
    dialect: 'mysql',
  }
};
