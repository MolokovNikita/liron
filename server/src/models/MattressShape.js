"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MattressShape extends Model {
    static associate(models) {
      // Можно добавить ассоциации, если нужно
      // Например: MattressShape.hasMany(models.Mattress, { foreignKey: "mattress_shape_id" });
    }
  }

  MattressShape.init(
    {
      shape_name: { type: DataTypes.STRING, allowNull: false },
      image: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "MattressShape",
      tableName: "mattress_shapes",
      freezeTableName: true,
      timestamps: false,
    },
  );

  return MattressShape;
};
