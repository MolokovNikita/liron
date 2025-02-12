"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MattressType extends Model {
    static associate(models) {
      // Можно добавить ассоциации, если нужно
      // Например: MattressType.hasMany(models.Mattress, { foreignKey: "matress_type_id" });
    }
  }

  MattressType.init(
    {
      type_name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "MattressType",
      tableName: "mattress_types",
      freezeTableName: true,
      timestamps: false,
    },
  );

  return MattressType;
};
