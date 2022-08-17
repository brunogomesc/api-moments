require('dotenv').config()

module.exports = {
      apiPort: process.env.PORT_API,
      userDatabase: process.env.USER_DATABASE,
      passwordDatabase: process.env.PASSWORD_DATABASE,
      database: process.env.DATABASE,
      host: process.env.HOST,
      version: process.env.VERSION
}