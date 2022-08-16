const routes = require('express').Router()
const Comment = require('../../models/Comment')
const config = require('../../../config')
const generateLog = require('../../service/GenerateLog');

routes.post('/:id', async (req,res) => {
      const body = req.body
      const id = req.params.id
      try {
            await Comment.create({
                  username: body['username'],
                  comment: body['comment'],
                  moment_id: id
            })

            await generateLog(
                  `/api/${config.version}/comment/create_moment/:id`,
                  'POST',
                  'The comment has created successfully!',
                  'Execute sucessfully'
            )

            return res.status(200).json({result: 'The comment has created successfully!'})
      } catch (error) {
            // Error handling
            await generateLog(
                  `/api/${config.version}/comment/create_moment/:id`,
                  'Error',
                  (error).toString(),
                  'Error Exception'
            )
            return res.status(500).json({error: error})
      }
})

module.exports = routes