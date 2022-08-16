'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('moments', {
      id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
      },
      title: {
            type: Sequelize.STRING,
            allowNull: false,
      },
      description: {
            type: Sequelize.STRING,
            allowNull: false,
      },
      image: {
            type: Sequelize.STRING,
            allowNull: false,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('moments');
  }
};
