"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("companies", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
    });

    await queryInterface.createTable("mattress_types", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    await queryInterface.createTable("mattress_shapes", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      shape_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });

    await queryInterface.createTable("mattresses", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      colors: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      material: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      price: {
        type: Sequelize.STRING,
      },
      width: {
        type: Sequelize.STRING,
      },
      length: {
        type: Sequelize.STRING,
      },
      thickness: {
        type: Sequelize.STRING,
      },
      rigidity: {
        type: Sequelize.STRING,
      },
      pictures_count: {
        type: Sequelize.INTEGER,
      },
      company_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "companies",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      matress_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "mattress_types",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      mattress_shape_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "mattress_shapes",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
    });

    await queryInterface.createTable("orders", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      customer_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      customer_phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      customer_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      order_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      matress_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "mattresses",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });

    await queryInterface.createTable("order_colors", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "orders",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      matress_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "mattresses",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("order_colors");
    await queryInterface.dropTable("orders");
    await queryInterface.dropTable("mattresses");
    await queryInterface.dropTable("mattress_shapes");
    await queryInterface.dropTable("mattress_types");
    await queryInterface.dropTable("companies");
  },
};
