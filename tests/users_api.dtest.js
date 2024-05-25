const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

const badUsername = {
    "name": "Eric4",
    "username": "Er",
    "password": "testingpassword"
}

const badPassword = {
    "name": "Eric5",
    "username": "Eric5",
    "password": "t"
}

const usedUsername = {
    "name": "Eric2",
    "username": "ZGong1",
    "password": "testingpassword"
}

beforeEach(async () => {
    await User.deleteMany({})

    var newUser = new User({
        "name": "Eric1",
        "username": "ZGong1",
        "passwordHash": "testingpassword"
    })
    await newUser.save()

    newUser = new User({
        "name": "Eric2",
        "username": "ZGong2",
        "passwordHash": "testingpassword"
    })
    await newUser.save()

    newUser = new User({
        "name": "Eric3",
        "username": "ZGong3",
        "passwordHash": "testingpassword"
    })
    await newUser.save()
})

test('too short username', async () => {
    const response = await api.post('/api/users').send(badUsername).expect(400)
    assert.deepStrictEqual(response.body, {error: "invalid username length"})
})

test('too short password', async () => {
    const response = await api.post('/api/users').send(badPassword).expect(400)
    assert.deepStrictEqual(response.body, {error: "invalid password length"})
})

test('username already in use', async () => {
    const response = await api.post('/api/users').send(usedUsername).expect(400)
    assert.deepStrictEqual(response.body, {error: "username is already taken"})
})


after(async () => {
    await mongoose.connection.close()
})