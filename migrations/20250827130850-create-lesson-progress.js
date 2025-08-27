'use strict';

const { UUIDV4 } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LessonProgresses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type:Sequelize.UUID,
        deafultValue:UUIDV4
      },
      userId: {
        type: Sequelize.UUID,
        allowNull:false
      },
      lessonId: {
        type: Sequelize.UUID,
        allowNull:false
      },
      completed: {
        type: Sequelize.BOOLEAN,
        deafultValue:false
      },
      completedAt: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('LessonProgresses');
  }
};