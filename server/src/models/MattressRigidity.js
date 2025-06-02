"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class MattressRigidity extends Model {
        static associate(models) {
            MattressRigidity.belongsToMany(models.Mattress, {
                through: models.MattressMattressRigidity,
                foreignKey: "rigidity_id",
                otherKey: "mattress_id",
                as: "mattresses",
            });
        }
    }

    MattressRigidity.init(
        {
            rigidity_name: { type: DataTypes.STRING, allowNull: false },
        },
        {
            sequelize,
            modelName: "MattressRigidity",
            tableName: "mattress_rigidity",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return MattressRigidity;
};
