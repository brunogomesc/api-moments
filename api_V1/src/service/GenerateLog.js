const Log = require('../models/Log')

async function generateLog(request, type, description, status) {
      try {
            await Log.create({
                  request: request,
                  type: type,
                  description: description,
                  status: status
            })
      } catch (error) {
            // Error handling
            console.log(error)
      }
}

module.exports = generateLog