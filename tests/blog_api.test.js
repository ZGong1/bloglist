const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

// Before Each method
beforeEach(async () => {
    await Blog.deleteMany({})

    newBlog = new Blog({title: "Eric1 Testerson's First blog", author:"Eric1", url:"test1.url.com", likes:1})
    await newBlog.save()

    newBlog = new Blog({title: "Eric2 Testerson's First blog", author:"Eric2", url:"test2.url.com", likes:2})
    await newBlog.save()

    newBlog = new Blog({title: "Eric3 Testerson's First blog", author:"Eric3", url:"test3.url.com", likes:3})
    await newBlog.save()
})


// Actual tests
test('Correct number of notes returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 3)
})

// close once finished
after(async () => {
    await mongoose.connection.close()
})