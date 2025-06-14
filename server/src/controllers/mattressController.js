const { Mattress, Company, MattressRigidity, MattressType } = require("../models");

class MattressController {
  async getAll(req, res) {
    try {
      const { tovar_type } = req.query;

      const whereClause = {};
      if (tovar_type) {
        const company = await Company.findOne({ where: { name: tovar_type } });
        if (!company) {
          return res.status(404).json({ error: "Company not found" });
        }
        whereClause.company_id = company.id;
      }

      const mattresses = await Mattress.findAll({
        where: whereClause,
        include: [
          {
            model: MattressRigidity,
            as: "MattressRigidities",
            attributes: ['rigidity_name'],
          },
          {
            model: MattressType,
            attributes: ['type_name'],
          },
        ],
        order: [['id', 'ASC']],
      });

      if (!mattresses.length) {
        return res.status(404).json({ error: "Products not found" });
      }

      const transformed = mattresses.map((mattress) => ({
        ...mattress.toJSON(),
        rigidity: mattress.MattressRigidities?.map(r => r.rigidity_name) || [],
        type: mattress.MattressType?.type_name || null,
      }));

      return res.json(transformed);
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
            as: "MattressRigidities",
            attributes: ['rigidity_name'],
          },
          {
            model: MattressType,
            attributes: ['type_name'],
          },
        ],
      });

      if (!mattress) {
        return res.status(404).json({ error: "Product not found" });
      }

      const transformed = {
        ...mattress.toJSON(),
        rigidity: mattress.MattressRigidities?.map(r => r.rigidity_name) || [],
        type: mattress.MattressType?.type_name || null,
      };

      res.json(transformed);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new MattressController();
