const Sequelize = require('sequelize')
const database = require('../../database/dbconfig')

const Moment = database.define('moment',{
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

module.exports = Moment;