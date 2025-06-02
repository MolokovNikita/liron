module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("mattress_mattress_rigidity", {
      mattress_id: {
        type: Sequelize.INTEGER,
        references: { model: "mattresses", key: "id" },
        onDelete: "CASCADE",
      },
      rigidity_id: {
        type: Sequelize.INTEGER,
        references: { model: "mattress_rigidities", key: "id" },
        onDelete: "CASCADE",
      },
      order: {
        type: Sequelize.INTEGER,
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("mattress_mattress_rigidity");
  }
};
