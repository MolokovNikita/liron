"use strict";

module.exports = (sequelize, DataTypes) => {
    const MattressMattressRigidity = sequelize.define("MattressMattressRigidity", {
        mattress_id: {
            type: DataTypes.INTEGER,
            references: { model: "mattresses", key: "id" },
            onDelete: "CASCADE",
        },
        rigidity_id: {
            type: DataTypes.INTEGER,
            references: { model: "mattress_rigidities", key: "id" },
            onDelete: "CASCADE",
        },
        order: {
            type: DataTypes.INTEGER,
        },
    }, {
        tableName: "mattress_mattress_rigidity",
        freezeTableName: true,
        timestamps: false,
    });

    return MattressMattressRigidity;
};
