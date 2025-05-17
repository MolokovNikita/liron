"use strict";
const { Model } = require("sequelize");
const Order = require("./Order");
const Mattress = require("./Mattress");

module.exports = (sequelize, DataTypes) => {
  class OrderClothingType extends Model {
    static associate(models) {
      OrderClothingType.belongsTo(models.Order, {
        foreignKey: "order_id",
        onDelete: "CASCADE",
      });
      OrderClothingType.belongsTo(models.Mattress, {
        foreignKey: "mattress_id",
        onDelete: "CASCADE",
      });
    }
  }

  OrderClothingType.init(
    {
      clothing_type: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "OrderClothingType",
      tableName: "order_clothe",
      freezeTableName: true,
      timestamps: false,
    },
  );

  return OrderClothingType;
};
