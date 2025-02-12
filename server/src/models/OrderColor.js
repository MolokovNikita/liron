"use strict";
const { Model } = require("sequelize");
const Order = require("./Order");
const Mattress = require("./Mattress");

module.exports = (sequelize, DataTypes) => {
  class OrderColor extends Model {
    static associate(models) {
      OrderColor.belongsTo(models.Order, {
        foreignKey: "order_id",
        onDelete: "CASCADE",
      });
      OrderColor.belongsTo(models.Mattress, {
        foreignKey: "matress_id",
        onDelete: "CASCADE",
      });
    }
  }

  OrderColor.init(
    {
      color: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "OrderColor",
      tableName: "order_colors",
      freezeTableName: true,
      timestamps: false,
    },
  );

  return OrderColor;
};
