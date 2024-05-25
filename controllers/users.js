const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body

    if (username.length < 3) {
        return response.status(400).send( {error: "invalid username length"} )
    }
    if (password.length < 3) {
        return response.status(400).send( {error: "invalid password length"} )
    }

    const usernameCount = await User.countDocuments({username})
    if (usernameCount > 0) {
        return response.status(400).send( {error: "username is already taken"} )
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

// add get to show all users
usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter