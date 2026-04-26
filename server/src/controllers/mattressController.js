const { Mattress, Company, MattressRigidity, MattressType, ClothingType, MattressClothingType } = require("../models");

// Сортировка ClothingTypes по полю order из junction-таблицы
function sortClothingTypes(mattressJson) {
  if (mattressJson.ClothingTypes) {
    mattressJson.ClothingTypes = [...mattressJson.ClothingTypes].sort(
      (a, b) => (a.MattressClothingType?.order ?? 0) - (b.MattressClothingType?.order ?? 0)
    );
  }
  return mattressJson;
}

const MATTRESS_INCLUDES = [
  {
    model: MattressRigidity,
    as: "MattressRigidities",
    attributes: ["rigidity_name"],
  },
  {
    model: MattressType,
    attributes: ["type_name"],
  },
  {
    model: ClothingType,
    as: "ClothingTypes",
    attributes: ["id", "name", "description", "image"],
    through: { attributes: ["order"] },
  },
];

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
        include: MATTRESS_INCLUDES,
        order: [["id", "ASC"]],
      });

      if (!mattresses.length) {
        return res.status(404).json({ error: "Products not found" });
      }

      const transformed = mattresses.map((mattress) => {
        const json = sortClothingTypes(mattress.toJSON());
        return {
          ...json,
          rigidity: mattress.MattressRigidities?.map((r) => r.rigidity_name) || [],
          type:     mattress.MattressType?.type_name || null,
        };
      });

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
        include: MATTRESS_INCLUDES,
      });

      if (!mattress) {
        return res.status(404).json({ error: "Product not found" });
      }

      const json = sortClothingTypes(mattress.toJSON());
      const transformed = {
        ...json,
        rigidity: mattress.MattressRigidities?.map((r) => r.rigidity_name) || [],
        type:     mattress.MattressType?.type_name || null,
      };

      res.json(transformed);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new MattressController();
