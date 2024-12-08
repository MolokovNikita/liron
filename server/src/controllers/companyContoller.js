const pool = require("../config/bdconfig.js");
const bcrypt = require("bcryptjs");
const { user } = require("pg/lib/defaults.js");
class CompanyController {
  async getAll(req, res) {
    const sql = "SELECT * FROM company";
    pool.query(sql, [], (err, result) => {
      if (err) {
        return console.error(err.message);
      }
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(result.rows);
    });
  }
}
module.exports = new CompanyController();
