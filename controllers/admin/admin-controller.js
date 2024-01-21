import { Router } from 'express'
const adminController = Router()

import { User } from '../../database/sequelize.js'

adminController.get('*', async (req, res, next) => {
    const user = await req.verifyToken()

    if (user.admin) {
        next()
        return
    }

    res.status(403).json({msg: 'Access denied'})
})

adminController.get('/users', async (req, res) => {
    const users = await User.findAll({})
    res.json(users.map(u => u.dataValues))
})

export default adminController