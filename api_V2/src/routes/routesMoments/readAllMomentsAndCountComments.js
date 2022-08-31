const routes = require('express').Router()
const Moment = require('../../models/Moment')
const config = require('../../../config')
const generateLog = require('../../service/GenerateLog');
const Comment = require('../../models/Comment');
const sequelize = require('../../../database/dbconfig');


routes.get('/', async (req,res) => {
      try {
            const moments = await sequelize.query(
                  `select m.id, m.title, m.description, m.image, 
                  c.username, c.comment, m.createdAt, m.updatedAt  
                  from moments m 
                  left JOIN comment c 
                  on m.id = c.moment_id
                  group by m.id, 
                  m.title, 
                  m.description, 
                  m.image, 
                  c.username, 
                  c.comment,
                  m.createdAt, 
                  m.updatedAt`
            )

            moments.splice(-1,1)

            if(moments !== null && moments.length !== 0) {
                  
                  await generateLog(
                        `/api/${config.version}/moment/read_moments_comments_all`,
                        'GET',
                        'The moments and comments have been successfully listed!',
                        'Execute sucessfully'
                  )
                  return res.status(200).json({moments}) 
            }
            else {
                  await generateLog(
                        `/api/${config.version}/moment/read_moments_comments_all`,
                        'GET',
                        'Moment not found!',
                        'Execute sucessfully'
                  )
                  return res.status(400).json({result: 'Moment not found!'})
            }

      } catch (error) {
            // Error handling
            await generateLog(
                  `/api/${config.version}/moment/read_moments_comments_all`,
                  'Error',
                  (error).toString(),
                  'Error Exception'
            )
            return res.status(500).json({erro: (error).toString()})
      }
})

module.exports = routes