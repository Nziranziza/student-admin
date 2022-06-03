import { Dialect, Sequelize } from 'sequelize';
import 'dotenv/config';

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST as string;
const dbDriver = process.env.DB_DRIVER as Dialect;
const dbPassword = process.env.DB_PASSWORD as string;
const databaseUrl = process.env.DATABASE_URL as string;

let sequelizeConnection: Sequelize;

if(databaseUrl) {
  sequelizeConnection = new Sequelize(databaseUrl, {
    "logging" : false,
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  });
} else {
  sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
  });
}

export default sequelizeConnection;