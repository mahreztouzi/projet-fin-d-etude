"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cours", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      namePdf: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      idEnseignant: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        references: {
          model: "Enseignants",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Cours");
  },
};
