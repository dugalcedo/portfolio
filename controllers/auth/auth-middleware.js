import dotenv from 'dotenv'
dotenv.config()
const { SECRET } = process.env

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

const verifyToken = function () {
    const token = this.headers['x-token']
    if (!token) return
    try {
        const parsedToken = jwt.verify(token, SECRET)
        return parsedToken
    } catch (error) {
        console.log('### ERROR PARSING TOKEN ###')
        console.log(error)
    }
}

import {
    User
} from '../../database/sequelize.js'

export default function authMiddleware(req, res, next) {
    req.generateHash = generateHash
    req.compareHashes = compareHashes
    req.verifyToken = verifyToken.bind(req)
    res.signToken = signToken.bind(res)
    
    next()
}