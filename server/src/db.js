const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("liron", "postgres", "1234", {
  host: "127.0.0.1",
  dialect: "postgres",
  port: 5432,
  logging: false,
});

module.exports = sequelize;
