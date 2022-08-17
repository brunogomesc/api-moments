'use strict';
const modelsMoment = require('../src/models/Moment')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      moment_id: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    })

    Comment.belongsTo(modelsMoment, { foreignKey: 'moment_id', allowNull: false })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  }
};
