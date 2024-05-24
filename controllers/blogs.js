const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})
  
blogRouter.post('/', (request, response) => {

  const blog = new Blog(request.body)

  if (!blog.url || !blog.title) {
    return response.status(400).end()
  }
  
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})


blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  try {
    const updatedNote = await Blog.findByIdAndUpdate(request.params.id, body, {new: true})
    response.json(updatedNote).end()
  } catch {
    console.log("api error in put")
    return response.status(500).end()
  }
})


module.exports = blogRouter