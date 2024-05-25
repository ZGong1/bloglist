const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const userList = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
  response.json(userList)
})
  
blogRouter.post('/', async (request, response) => {
  // find user to be poster of blog
  const userList = await User.find({})
  const userWhoPostedID = userList[0]._id

  const {title, author, url, likes} = request.body

  const blog = new Blog({
    title, author, url, likes, user: userWhoPostedID
  })

  // checks if url and title are there
  if (!blog.url || !blog.title) {
    return response.status(400).end()
  }

  // save the blog and end 
  const savedBlog = await blog.save()

  // TODO: add the note id to the correct user
  const user = await User.findById(userWhoPostedID)
  // console.log(user)
  user.notes = user.notes.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
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