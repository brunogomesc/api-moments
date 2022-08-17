const routes = require('express').Router()
const Moment = require('../../models/Moment')
const config = require('../../../config')
const generateLog = require('../../service/GenerateLog');

routes.get('/:id', async (req,res) => {
      const id = req.params.id
      try {
            const moment = await Moment.findByPk(id)

            if(moment !== null && moment.length !== 0) {
                  await generateLog(
                        `/api/${config.version}/moment/read_moment_byid/:id`,
                        'GET',
                        'The moment has been successfully listed!',
                        'Execute sucessfully'
                  )
                  return res.status(200).json({result: moment}) 
            }
            else {
                  await generateLog(
                        `/api/${config.version}/moment/read_moment_byid/:id`,
                        'GET',
                        'Moment not found!',
                        'Execute sucessfully'
                  )
                  return res.status(400).json({result: 'Moment not found!'})
            }
      } catch (error) {
            // Error handling
            await generateLog(
                  `/api/${config.version}/moment/read_moment_byid`,
                  'Error',
                  (error).toString(),
                  'Error Exception'
            )

            return res.status(500).json({error: error})
      }
})

module.exports = routes