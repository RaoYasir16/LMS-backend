'use strict';

const { UUIDV4 } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type:Sequelize.UUID
      },
      title: {
        type: Sequelize.STRING,
        allowNull:false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      price: {
        type: Sequelize.STRING,
        allowNull:false
      },
      category: {
        type: Sequelize.UUID,
        allowNull:false
      },
      thumbnail: {
        type: Sequelize.STRING,
        allowNull:false
      },
      instructorId: {
        type: Sequelize.UUID,
        allowNull:false
      },
      status: {
        type: Sequelize.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};