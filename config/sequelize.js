const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE, 
    process.env.MYSQL_USERNAME,
    process.env.MYSQL_PASSWORD,
    {
      host: process.env.MYSQL_HOST || '127.0.0.1',
      port: process.env.MYSQL_PORT || 3306,
      dialect: 'mysql'
    }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connected to ${process.env.MYSQL_DATABASE} at ${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}`);
  } catch (err) {
    console.error(`Unable to connect to the database at ${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}`, err);
  }
};

testConnection();

module.exports = sequelize;