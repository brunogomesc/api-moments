const routes = require('express').Router()
const Moment = require('../../models/Moment')
const config = require('../../../config')
const multer = require('multer');
const v4 = require('uuid').v4()
const generateLog = require('../../service/GenerateLog');

var fileName

//Save the file with new name
const storage = multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, 'uploads/')
      },
      filename: function (req, file, cb) {
          // Extracting the original file extension:
          const extensionFile = file.originalname.split('.')[1];
  
          // Indicates the new file name:
          cb(null, `${v4}.${extensionFile}`)

          fileName = `${v4}.${extensionFile}`
      }
});
  
const upload = multer({ storage });

routes.put('/:id', upload.single('image'), async (req,res) => {
      const id = req.params.id
      const body = req.body

      try {
            const moment = await Moment.findByPk(id)

            if(moment !== null) {
                  moment.title = body['title'] == null ? moment.title : body['title']
                  moment.description = body['description'] == null ? moment.description : body['description']
                  moment.image = fileName == null ? moment.image : fileName

                  await moment.save();

                  await generateLog(
                        `/api/${config.version}/moment/update_moment/:id`,
                        'PUT',
                        'Moment has been updated successfully!',
                        'Execute sucessfully'
                  )
                  return res.status(200).json({result: 'Moment has been updated successfully!', moment})
            }
            else {
                  await generateLog(
                        `/api/${config.version}/moment/update_moment/:id`,
                        'PUT',
                        'Moment not found!',
                        'Execute sucessfully'
                  )
                  return res.status(400).json({result: 'Moment not found!'})
            }
      } catch (error) {
            // Error handling
            await generateLog(
                  `/api/${config.version}/moment/update_moment/:id`,
                  'Error',
                  (error).toString(),
                  'Error Exception'
            )

            return res.status(500).json({error: error})
      }

})

module.exports = routes