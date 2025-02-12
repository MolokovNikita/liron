"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      // Можно добавить ассоциации, если нужно, например:
      // Company.hasMany(models.Mattress, { foreignKey: "company_id" });
    }
  }

  Company.init(
    {
      name: { type: DataTypes.STRING, unique: true, allowNull: false },
    },
    {
      sequelize,
      modelName: "Company",
      tableName: "companies",
      freezeTableName: true,
      timestamps: false,
    },
  );

  return Company;
};
