import dotenv from 'dotenv'
dotenv.config()
const { SECRET } = process.env

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const generateHash = (password) => {
    const hash = bcrypt.hashSync(password, 10)
    return hash
}

const compareHashes = (hash1, hash2) => {
    return bcrypt.compareSync(hash1, hash2)
}

const signToken = (payload, res) => {
    const token = jwt.sign(payload, SECRET)
    if (res) res.cookie('token', token)
    return token
}

const verifyToken = (req) => {
    
}