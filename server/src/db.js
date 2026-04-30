const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "liron",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "postgres",
  {
  host: process.env.DB_HOST || "db",
  dialect: "postgres",
  port: Number(process.env.DB_PORT || 5432),
  logging: false,
});

module.exports = sequelize;
