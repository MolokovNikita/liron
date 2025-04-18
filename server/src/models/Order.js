"use strict";
const { Model } = require("sequelize");
const Mattress = require("./Mattress");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Mattress, {
        foreignKey: "mattress_id",
        onDelete: "CASCADE",
      });
    }
  }

  Order.init(
    {
      customer_name: { type: DataTypes.STRING, allowNull: false },
      customer_phone: { type: DataTypes.STRING, allowNull: false },
      customer_email: { type: DataTypes.STRING, allowNull: false },
      order_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      freezeTableName: true,
      timestamps: false,
    },
  );

  return Order;
};
