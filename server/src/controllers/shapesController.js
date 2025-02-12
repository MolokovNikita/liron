const { MattressShape } = require("../models");
class ShapesController {
  async getAll(req, res) {
    try {
      const shapes = await MattressShape.findAll();
      if (!shapes.length) {
        return res.status(404).json({ error: "Shapes not found" });
      }
      res.json(shapes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
module.exports = new ShapesController();
