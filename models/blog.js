const mongoose = require('mongoose')

const mongoUrl = process.env.MONGO_URI
mongoose.connect(mongoUrl)
  .then(() => console.log("Connected to database"))

  const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog