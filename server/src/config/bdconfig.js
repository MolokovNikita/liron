const { Pool } = require("pg");
require("dotenv").config({ path: "../src/config/ormpath.env" });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // часто нужно для подключения к хостинг-базам (Render и др.)
  },
});

module.exports = pool;
