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
test('Correct number of blogs returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 3)
})

test('check if id property is actually "id"', async () => {
    const response = await api.get('/api/blogs')
    assert.notStrictEqual(response._body[0].id, undefined)
    // console.log(response)
})

test('check POST method', async () => {
    // make new blog to add
    const newBlog = {title: "Eric4 Testerson's First blog", author:"Eric4", url:"test4.url.com", likes:3}

    // actually post it and use .expect()
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    //check if # of entries went up
    const numOfEntries = await Blog.countDocuments()
    assert.strictEqual(numOfEntries, 4)
})

test('check if likes are defaulted to 0', async () => {
    // make new blog to add
    const newBlog = {title: "Eric4 Testerson's First blog", author:"Eric4", url:"test4.url.com"}

    const response = await api.post('/api/blogs').send(newBlog)

    // console.log(response._body)
    assert.strictEqual(response._body.likes, 0)
})

test('api returns 400 if title or url are missing', async () => {
    const newBlog = {title: "Eric4 Testerson's First blog", author:"Eric4"}

    await api.post('/api/blogs').send(newBlog).expect(400)

})

test('tests DELETE method', async () => {
    const response = await api.get('/api/blogs')
    const idToDelete = response._body[0].id

    await api.delete(`/api/blogs/${idToDelete}`).expect(204)

    const numOfBlogs = await Blog.countDocuments()

    assert.strictEqual(numOfBlogs, 2)
})

test('PUT method to replace something', async () => {
    const toPUT = {
        "title": "Jenna42's Post",
        "author": "Jenna2",
        "url": "test.url.com",
        "likes": 99
    }
    const response = await api.get('/api/blogs')
    const idToPut = response._body[0].id

    await api.put(`/api/blogs/${idToPut}`).send(toPUT).expect(200)

    const secondResponse = await api.get('/api/blogs')
    const toCheck = secondResponse._body[0]
    delete toCheck.id

    assert.deepStrictEqual(toCheck, toPUT)
})

// close once finished
after(async () => {
    await mongoose.connection.close()
})