"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Mattress extends Model {
    static associate(models) {
      Mattress.belongsTo(models.Company, {
        foreignKey: "company_id",
        onDelete: "CASCADE",
      });
      Mattress.belongsTo(models.MattressType, {
        foreignKey: "mattress_type_id",
      });
      Mattress.belongsTo(models.MattressShape, {
        foreignKey: "mattress_shape_id",
      });
      Mattress.belongsTo(models.MattressRigidity, {
        foreignKey: "mattress_rigidity_id",
      });
    }
  }

  Mattress.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      clothing_types: { type: DataTypes.ARRAY(DataTypes.STRING) },
      material: { type: DataTypes.STRING },
      description: { type: DataTypes.TEXT },
      price: { type: DataTypes.STRING },
      width: { type: DataTypes.STRING },
      length: { type: DataTypes.STRING },
      thickness: { type: DataTypes.STRING },
      pictures_count: { type: DataTypes.INTEGER },
      max_weight: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: "Mattress",
      tableName: "mattresses",
      freezeTableName: true,
      timestamps: false,
    },
  );

  return Mattress;
};
