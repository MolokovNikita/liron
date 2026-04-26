"use strict";

module.exports = (sequelize, DataTypes) => {
  const MattressClothingType = sequelize.define(
    "MattressClothingType",
    {
      mattress_id: {
        type: DataTypes.INTEGER,
        references: { model: "mattresses", key: "id" },
        onDelete: "CASCADE",
      },
      clothing_type_id: {
        type: DataTypes.INTEGER,
        references: { model: "clothing_types", key: "id" },
        onDelete: "CASCADE",
      },
      order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName:       "mattress_clothing_type",
      freezeTableName: true,
      timestamps:      false,
    }
  );

  return MattressClothingType;
};
