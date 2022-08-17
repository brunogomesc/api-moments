const routes = require('express').Router()
const Comment = require('../../models/Comment')
const config = require('../../../config')
const generateLog = require('../../service/GenerateLog');

routes.delete('/:id', async (req,res) => {
      const id = req.params.id

      try {
            const result = await Comment.destroy({where:{id: id}})

            if(result !== null && result !== 0) {

                  await generateLog(
                        `/api/${config.version}/comment/delete_comment/:id`,
                        'DELETE',
                        'The comment was successfully deleted!',
                        'Execute sucessfully'
                  )
                  return res.status(200).json({result: 'The comment was successfully deleted!'})
            }
            else {
                  await generateLog(
                        `/api/${config.version}/comment/delete_comment/:id`,
                        'DELETE',
                        'Comment not found!',
                        'Execute sucessfully'
                  )
                  return res.status(400).json({result: 'Comment not found!'})
            }
      } catch (error) {
            // Error handling
            await generateLog(
                  `/api/${config.version}/comment/delete_comment/:id`,
                  'Error',
                  (error).toString(),
                  'Error Exception'
            )

            return res.status(500).json({error: error})
      }

})

module.exports = routes