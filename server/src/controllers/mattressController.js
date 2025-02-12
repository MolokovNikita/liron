const { Mattress, Company } = require("../models");

class MattressController {
  async getAll(req, res) {
    try {
      const { tovar_type } = req.query;

      if (tovar_type) {
        // Находим company_id по названию компании
        const company = await Company.findOne({ where: { name: tovar_type } });

        if (!company) {
          return res.status(404).json({ error: "Company not found" });
        }

        // Теперь ищем матрасы, относящиеся к найденному company_id
        const mattresses = await Mattress.findAll({
          where: { company_id: company.id },
        });

        if (!mattresses.length) {
          return res.status(404).json({ error: "Products not found" });
        }

        return res.json(mattresses);
      } else {
        // Если название компании не передано, возвращаем все матрасы
        const mattresses = await Mattress.findAll();
        if (!mattresses.length) {
          return res.status(404).json({ error: "Products not found" });
        }
        return res.json(mattresses);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const mattress = await Mattress.findByPk(id);
      if (!mattress) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(mattress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new MattressController();
