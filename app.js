// const logger = require('./utils/logger')
const config = require('./utils/config')
const express = require('express')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const mongoUrl = config.MONGO_URI
mongoose.connect(mongoUrl)
  .then(() => console.log("Connected to database"))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


module.exports = app
