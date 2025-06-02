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

      // Многие-ко-многим с MattressRigidity
      Mattress.belongsToMany(models.MattressRigidity, {
        through: models.MattressMattressRigidity,
        foreignKey: "mattress_id",
        otherKey: "rigidity_id",
        as: "MattressRigidities",
      });
    }
  }

  Mattress.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      clothing_types: { type: DataTypes.ARRAY(DataTypes.STRING) },
      material: { type: DataTypes.ARRAY(DataTypes.STRING) },
      price: { type: DataTypes.ARRAY(DataTypes.STRING) },
      description: { type: DataTypes.TEXT },
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
    }
  );

  return Mattress;
};
