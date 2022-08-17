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

routes.post('/', upload.single('image'), async (req,res) => {
      const body = req.body
      try {
            await Moment.create({
                  title: body['title'],
                  description: body['description'],
                  image: fileName
            })

            await generateLog(
                  `/api/${config.version}/moment/create_moment`,
                  'POST',
                  'The moment has created successfully!',
                  'Execute sucessfully'
            )

            return res.status(200).json({result: 'The moment has created successfully!'})
      } catch (error) {
            // Error handling
            await generateLog(
                  `/api/${config.version}/moment/create_moment`,
                  'Error',
                  (error).toString(),
                  'Error Exception'
            )

            return res.status(500).json({error: error})
      }
})

module.exports = routes