const Sequelize = require('sequelize')
const database = require('../../database/dbconfig')

const Log = database.define('log',{
      id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
      },
      request: {
            type: Sequelize.STRING,
            allowNull: false,
      },
      type: {
            type: Sequelize.STRING,
            allowNull: false,
      },
      description: {
            type: Sequelize.STRING,
            allowNull: false,
      },
      status: {
            type: Sequelize.STRING,
            allowNull: false,
      }
})

module.exports = Log;