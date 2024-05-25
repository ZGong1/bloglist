const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
    const {username, password} = request.body

    const user = await User.findOne({username})

    if (!user) {
        return response.status(401).json({error: "invalid username"})
    }
    const passwordCheck = await bcrypt.compare(password, user.passwordHash)
    if (!passwordCheck) {
        return response.status(401).json({error: "invalid password"})
    }

    const tokenGen = {
        username,
        id: user._id
    }

    const token = jwt.sign(tokenGen, process.env.SECRET)

    console.log("username and password verified")
    response.status(200).send({token, username, name: user.name})
})


module.exports = loginRouter