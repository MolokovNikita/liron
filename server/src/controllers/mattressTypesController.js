const { MattressType } = require("../models");
class MattressTypesController {
  async getAll(req, res) {
    try {
      const types = await MattressType.findAll();
      if (!types.length) {
        return res.status(404).json({ error: "Types not found" });
      }
      res.json(types);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
module.exports = new MattressTypesController();
