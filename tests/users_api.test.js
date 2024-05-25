const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    var newUser = new User({
        "name": "Eric1",
        "username": "ZGong1",
        "password": "testingpassword"
    })
    await newUser.save()

    newUser = new User({
        "name": "Eric2",
        "username": "ZGong2",
        "password": "testingpassword"
    })
    await newUser.save()

    newUser = new User({
        "name": "Eric3",
        "username": "ZGong3",
        "password": "testingpassword"
    })
    await newUser.save()
})