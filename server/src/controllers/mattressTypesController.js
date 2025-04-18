const { MattressType, Color } = require("../models");

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

  async getOne(req, res) {
    try {
      const { id } = req.params; // Получаем ID из параметров запроса
      const mattress = await MattressType.findByPk(id, {
        include: [{ model: Color, as: 'colors' }], // Подключаем таблицу цветов
      });

      if (!mattress) {
        return res.status(404).json({ error: "Mattress not found" });
      }

      // Формируем ответ с названием и цветами
      const response = {
        id: mattress.id,
        name: mattress.name,
        colors: mattress.colors.map(color => color.name), // Получаем названия цветов
      };

      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new MattressTypesController();
