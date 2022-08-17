const express = require('express')
const config = require('../config')
const database = require('../database/dbconfig')
const generateLog = require('./service/GenerateLog')

//#region Imports for route Moments
const createMoment = require('./routes/routesMoments/createMoment')
const readMomentsAll = require('./routes/routesMoments/readAllMoments')
const readMomentByid = require('./routes/routesMoments/readMomentById')
const updateMoment = require('./routes/routesMoments/updateMoment')
const deleteMoment = require('./routes/routesMoments/removeMoment')
//#endregion

//#region Imports for route Comments
const createComment = require('./routes/routesComments/createComment')
const readAllComment = require('./routes/routesComments/readAllComments')
const updateComment = require('./routes/routesComments/updateComment')
const deleteComment = require('./routes/routesComments/removeComment')
//#endregion

//#region Configuration Express
const app = express()

app.use(express.urlencoded({extended: true}))

app.use(express.json())
//#endregion

//#region Default route for run validation
app.get(`/api/${config.version}/`, async (req,res) => {
      try {
            await database.sync();

            await generateLog(
                  `/api/${config.version}/`,
                  'GET',
                  (Date(Date.now()) + ' - API and Database is running!').toString(),
                  'Execute sucessfully'
            )

            return res.status(200).json({status: Date(Date.now()) + ' - API and Database is running!'})
      } catch (error) {

            await generateLog(
                  `/api/${config.version}/`,
                  'Error',
                  (error).toString(),
                  'Error Exception'
            )
            
            return res.status(500).json({error: error})
      }
})
//#endregion

//#region Routes Moments
app.use(`/api/${config.version}/moment/create_moment`,createMoment)

app.use(`/api/${config.version}/moment/read_moments_all`,readMomentsAll)

app.use(`/api/${config.version}/moment/read_moments_byid`,readMomentByid)

app.use(`/api/${config.version}/moment/update_moment`,updateMoment)

app.use(`/api/${config.version}/moment/delete_moment`,deleteMoment)
//#endregion

//#region Routes Comments
app.use(`/api/${config.version}/comment/create_comment`,createComment)

app.use(`/api/${config.version}/comment/read_all_comment`,readAllComment)

app.use(`/api/${config.version}/comment/update_comment`,updateComment)

app.use(`/api/${config.version}/comment/delete_comment`,deleteComment)

//#endregion

//#region Starting application
app.listen(config.apiPort)
//#endregion

