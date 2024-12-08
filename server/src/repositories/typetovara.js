const pool = require("../config/bdconfig.js");
class TypeTovaraRepository {
  static async getClientDataByName(name) {
    const response = await pool.query(
      "SELECT * FROM company WHERE LOWER(name) = $1",
      [name],
    );
    if (!response.rows.length) {
      return null;
    }

    return response.rows[0];
  }
}

module.exports = TypeTovaraRepository;
