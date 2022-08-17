const Sequelize = require('sequelize')
const database = require('../../database/dbconfig')

const Comment = database.define('comment',{
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
            foreignKey: true
      }
})

module.exports = Comment;