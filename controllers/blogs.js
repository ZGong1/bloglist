const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

// get token from request helper function
const getToken = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}


// gets list of all blogs
blogRouter.get('/', async (request, response) => {
  const userList = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
  response.json(userList)
})

// adds new blog
blogRouter.post('/', async (request, response) => {
  // checks if token is valid
  const token = getToken(request)
  var decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch {
    return response.status(401).send({error: "token verification failed"})
  }
  
  // find user to be poster of blog
  const user = await User.findById(decodedToken.id)
  const userWhoPostedID = user._id

  const {title, author, url, likes} = request.body

  const blog = new Blog({
    title, author, url, likes, user: userWhoPostedID
  })

  // checks if url and title are there
  if (!blog.url || !blog.title) {
    return response.status(400).send({error: "your post doesn't contain either a url or a title"})
  }

  // save the blog, and new user data -> end 
  const savedBlog = await blog.save()

  user.notes = user.notes.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

// deletes one by id
blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

// updates one by id
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