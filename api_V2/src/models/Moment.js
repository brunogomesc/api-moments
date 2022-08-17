const Sequelize = require('sequelize')
const database = require('../../database/dbconfig');
const Comment = require('./Comment');

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
            validate: {
                  isUUID: 4,
            }
      }
})

module.exports = Moment;