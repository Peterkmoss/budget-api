import express from 'express'
import bodyParser from 'body-parser'
import userController from './controllers/UsersController'

require('dotenv').config()

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api', userController)

app.listen(8080, () => {
    console.log('Server running at port 8080')
})