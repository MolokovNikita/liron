const { Pool } = require("pg");
require("dotenv").config({ path: "../src/config/ormpath.env" });
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "liron",
  password: 1234,
  port: 5433,
});
module.exports = pool;
