const routes = require('express').Router()
const Comment = require('../../models/Comment')
const config = require('../../../config')
const generateLog = require('../../service/GenerateLog');

routes.put('/:id', async (req,res) => {
      const id = req.params.id
      const body = req.body

      try {
            const comment = await Comment.findByPk(id)

            if(comment !== null && comment.length !== 0) {
                  comment.comment = body['comment'] == null ? comment.comment : body['comment']

                  await comment.save();

                  await generateLog(
                        `/api/${config.version}/comment/update_comment/:id`,
                        'PUT',
                        'Comment has been updated successfully!',
                        'Execute sucessfully'
                  )
                  return res.status(200).json({result: 'Comment has been updated successfully!', comment})
            }
            else {
                  await generateLog(
                        `/api/${config.version}/comment/update_comment/:id`,
                        'PUT',
                        'Comment not found!',
                        'Execute sucessfully'
                  )
                  return res.status(400).json({result: 'Comment not found!'})
            }
      } catch (error) {
            // Error handling
            await generateLog(
                  `/api/${config.version}/comment/update_comment/:id`,
                  'Error',
                  (error).toString(),
                  'Error Exception'
            )

            return res.status(500).json({error: error})
      }

})

module.exports = routes