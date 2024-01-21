import dotenv from 'dotenv'
dotenv.config()
const { SECRET } = process.env

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../../database/sequelize.js'

const generateHash = (password) => {
    const hash = bcrypt.hashSync(password, 10)
    return hash
}

const compareHashes = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

const signToken = function (payload) {
    const token = jwt.sign(payload, SECRET)
    return token
}

const verifyToken = async function () {
    const token = this.headers['x-token']
    console.log(`
Verifying token: ${token}
    `)
    if (!token) return
    try {
        const parsedToken = jwt.verify(token, SECRET)
        const user = await User.findOne({where: {username: parsedToken.username}})
        return user.dataValues
    } catch (error) {
        console.log('### ERROR PARSING TOKEN ###')
        console.log(token)
        console.log(error)
    }
}

export default function authMiddleware(req, res, next) {
    req.generateHash = generateHash
    req.compareHashes = compareHashes
    req.verifyToken = verifyToken.bind(req)
    res.signToken = signToken.bind(res)
    
    next()
}