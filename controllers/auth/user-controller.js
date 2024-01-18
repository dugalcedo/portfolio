import express from 'express'
const userController = express.Router()

import { User } from '../../database/sequelize.js'

// Authorize
userController.get('/auth', async (req, res) => {
    const token = req.verifyToken()

    if (!token) {
        res.json({})
        return
    }

    const user = await User.findOne({where: {username: token.username}})

    if (!user) {
        res.json({})
        return
    }

    const publicUser = {...user.dataValues}
    delete publicUser.password
    res.json(publicUser)
})

// Log in
userController.get('/', async (req, res) => {
    const username = req.headers['x-username']
    const password = req.headers['x-password']

    const user = await User.findOne({where: {username}})

    if (!user) {
        res.status(404).json({msg: `User "${username}" does not exist.`})
        return
    }

    const goodPassword = req.compareHashes(password, user.password)

    if (!goodPassword) {
        res.status(400).json({msg: `Password is incorrect.`})
        return
    }

    const token = res.signToken(user.dataValues, true)

    res.json({msg: 'Success', user, token})
})

// Sign up
userController.post('/', async (req, res) => {
    const {
        username,
        password,
        email,
        avatar
    } = req.body

    if (await User.findOne({where: {username}})) {
        res.status(400).json({msg: 'Username taken.'})
        return
    }

    const hash = req.generateHash(password)

    try {
        await User.create({
            username,
            password: hash,
            email,
            avatar
        })
        res.json({msg: 'Success'})
    } catch (error) {
        console.log("### Failed signing up ###")
        console.log(error)
    }
})

export default userController