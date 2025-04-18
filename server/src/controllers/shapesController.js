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

  async getOne(req, res) {
    try {
      const { id } = req.params; // Получаем ID из параметров запроса
      const shape = await MattressShape.findByPk(id);

      if (!shape) {
        return res.status(404).json({ error: "Shape not found" });
      }

      // Формируем ответ с названием формы
      const response = {
        id: shape.id,
        name: shape.name,
      };

      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new ShapesController();
