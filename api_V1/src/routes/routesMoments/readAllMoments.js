const routes = require('express').Router()
const Moment = require('../../models/Moment')
const config = require('../../../config')
const generateLog = require('../../service/GenerateLog');

routes.get('/', async (req,res) => {
      try {
            const moments = await Moment.findAll()

            if(moments !== null) {
                  await generateLog(
                        `/api/${config.version}/moment/read_moments_all`,
                        'GET',
                        'The moments have been successfully listed!',
                        'Execute sucessfully'
                  )
                  return res.status(200).json({result: moments}) 
            }
            else {
                  await generateLog(
                        `/api/${config.version}/moment/read_moments_all`,
                        'GET',
                        'Moment not found!',
                        'Execute sucessfully'
                  )
                  return res.status(400).json({result: 'Moment not found!'})
            }

      } catch (error) {
            // Error handling
            await generateLog(
                  `/api/${config.version}/moment/read_moments_all`,
                  'Error',
                  (error).toString(),
                  'Error Exception'
            )

            return res.status(500).json({error: error})
      }
})

module.exports = routes