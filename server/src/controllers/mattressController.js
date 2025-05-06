const { Mattress, Company, MattressRigidity, MattressType } = require("../models");

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
          include: [
            {
              model: MattressRigidity,
              attributes: ['rigidity_name']
            },
            {
              model: MattressType,
              attributes: ['type_name']
            }
          ]
        });

        if (!mattresses.length) {
          return res.status(404).json({ error: "Products not found" });
        }

        // Transform the response to include rigidity and type names
        const transformedMattresses = mattresses.map(mattress => ({
          ...mattress.toJSON(),
          rigidity: mattress.MattressRigidity?.rigidity_name || null,
          type: mattress.MattressType?.type_name || null
        }));

        return res.json(transformedMattresses);
      } else {
        // Если название компании не передано, возвращаем все матрасы
        const mattresses = await Mattress.findAll({
          include: [
            {
              model: MattressRigidity,
              attributes: ['rigidity_name']
            },
            {
              model: MattressType,
              attributes: ['type_name']
            }
          ]
        });

        if (!mattresses.length) {
          return res.status(404).json({ error: "Products not found" });
        }

        // Transform the response to include rigidity and type names
        const transformedMattresses = mattresses.map(mattress => ({
          ...mattress.toJSON(),
          rigidity: mattress.MattressRigidity?.rigidity_name || null,
          type: mattress.MattressType?.type_name || null
        }));

        return res.json(transformedMattresses);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const mattress = await Mattress.findByPk(id, {
        include: [
          {
            model: MattressRigidity,
            attributes: ['rigidity_name']
          },
          {
            model: MattressType,
            attributes: ['type_name']
          }
        ]
      });

      if (!mattress) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Transform the response to include rigidity and type names
      const transformedMattress = {
        ...mattress.toJSON(),
        rigidity: mattress.MattressRigidity?.rigidity_name || null,
        type: mattress.MattressType?.type_name || null
      };

      res.json(transformedMattress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new MattressController();
