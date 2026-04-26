"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ClothingType extends Model {
    static associate(models) {
      ClothingType.belongsToMany(models.Mattress, {
        through: models.MattressClothingType,
        foreignKey: "clothing_type_id",
        otherKey: "mattress_id",
        as: "mattresses",
      });
    }
  }

  ClothingType.init(
    {
      name:        { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT,   allowNull: true },
      image:       { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName:       "ClothingType",
      tableName:       "clothing_types",
      freezeTableName: true,
      timestamps:      false,
    }
  );

  return ClothingType;
};
