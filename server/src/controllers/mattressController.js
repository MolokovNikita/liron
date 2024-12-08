const pool = require("../config/bdconfig.js");
const bcrypt = require("bcryptjs");
const { user } = require("pg/lib/defaults.js");
const TypeTovaraRepository = require("../repositories/typetovara.js");
class MattressController {
  async getAll(req, res) {
    const { tovar_type } = req.query;
    if (!tovar_type) {
      const sql = "SELECT * FROM matress";
      pool.query(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message);
        }
        if (result.rows.length === 0) {
          return res.status(404).json({ error: "Products not found" });
        }
        res.json(result.rows);
      });
    } else {
      const type = await TypeTovaraRepository.getClientDataByName(tovar_type);
      if (!type) return res.status(404).json({ error: "Products not found" });
      const type_id = type.id;
      const sql = "SELECT * FROM matress WHERE company_id = $1";
      pool.query(sql, [type_id], (err, result) => {
        if (err) {
          return console.error(err.message);
        }
        if (result.rows.length === 0) {
          return res.status(404).json({ error: "Products not found" });
        }
        res.json(result.rows);
      });
    }
  }
  async getOne(req, res) {
    const id_tovar = req.params.id;
    const { tovar_type } = req.query;
    if (!tovar_type)
      return res.status(404).json({ error: "Tovar company error" });
    const type = await TypeTovaraRepository.getClientDataByName(tovar_type);
    if (!type) return res.status(404).json({ error: "Products not found" });
    const type_id = type.id;
    const sql = "SELECT * FROM matress WHERE id = $1 AND company_id = $2";
    pool.query(sql, [id_tovar, type_id], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(400).json({ error: "Invalid syntax" });
      }
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(result.rows[0]);
    });
  }
}
module.exports = new MattressController();
