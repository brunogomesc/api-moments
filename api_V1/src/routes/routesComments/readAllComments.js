const routes = require('express').Router()
const Comment = require('../../models/Comment')
const config = require('../../../config')
const generateLog = require('../../service/GenerateLog');

routes.get('/:id', async (req,res) => {
      const id = req.params.id
      try {
            const comment = await Comment.findAll({where: { moment_id: id}})

            if(comment !== null && comment.length !== 0) {
                  await generateLog(
                        `/api/${config.version}/comment/read_all_comment/:id`,
                        'GET',
                        'The comment has been successfully listed!',
                        'Execute sucessfully'
                  )
                  return res.status(200).json({result: comment}) 
            }
            else {
                  await generateLog(
                        `/api/${config.version}/comment/read_all_comment/:id`,
                        'GET',
                        'Comment not found!',
                        'Execute sucessfully'
                  )
                  return res.status(400).json({result: 'Comment not found!'})
            }
      } catch (error) {
            // Error handling
            await generateLog(
                  `/api/${config.version}/comment/read_all_comment/:id`,
                  'Error',
                  (error).toString(),
                  'Error Exception'
            )

            return res.status(500).json({error: error})
      }
})

module.exports = routes