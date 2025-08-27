"use strict";

const { UUIDV4 } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Lessons", {
      id: {
        type: Sequelize.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull:false
      },
      videoUrl: {
        type: Sequelize.STRING,
        allowNull:false
      },
      sectionId: {
        type: Sequelize.UUID,
        allowNull:false
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
    await queryInterface.dropTable("Lessons");
  },
};
