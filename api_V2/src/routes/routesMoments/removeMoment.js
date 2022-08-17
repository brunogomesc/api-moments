const routes = require('express').Router()
const Moment = require('../../models/Moment')
const config = require('../../../config')
const multer = require('multer');
const v4 = require('uuid').v4()
const generateLog = require('../../service/GenerateLog');

routes.delete('/:id', async (req,res) => {
      const id = req.params.id

      try {
            const result = await Moment.destroy({where:{id: id}})

            if(result !== null) {

                  await generateLog(
                        `/api/${config.version}/moment/delete_moment/:id`,
                        'DELETE',
                        'The moment was successfully deleted!',
                        'Execute sucessfully'
                  )
                  return res.status(200).json({result: 'The moment was successfully deleted!'})
            }
            else {
                  await generateLog(
                        `/api/${config.version}/moment/delete_moment/:id`,
                        'DELETE',
                        'Moment not found!',
                        'Execute sucessfully'
                  )
                  return res.status(400).json({result: 'Moment not found!'})
            }
      } catch (error) {
            // Error handling
            await generateLog(
                  `/api/${config.version}/moment/delete_moment/:id`,
                  'Error',
                  (error).toString(),
                  'Error Exception'
            )

            return res.status(500).json({error: error})
      }

})

module.exports = routes