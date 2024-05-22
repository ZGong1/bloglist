require('dotenv').config()

//const logger = require('./utils/logger')
//const {MONGO_URI, PORT} = require('./utils/config')
const express = require('express')
const blogRouter = require('./controllers/blogs')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog.js')



app.use(cors())
app.use(express.json())


app.use('/api/blogs', blogRouter)


module.exports = app

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })