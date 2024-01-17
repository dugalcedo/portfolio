// ### Env config ### //
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()
const {
    DBURI,
    PORT = 4321,
    FRONTEND = "/"
} = process.env

// ### Express config ### //
import express from 'express'

import cors from 'cors'
const app = express()
app.use(
    express.static('frontend/dist'),
    cors(),
    express.json(), 
    cookieParser(), 
    (req, res, next) => {
        console.log(`${req.method}:${req.url}`)
        next()
    },
    authMiddleware
)

// ### Express routing ### //
import router from './controllers/router.js'
import authMiddleware from './controllers/auth/auth-middleware.js'
app.use(router)

// ### Startup ### //
import { connect } from './database/sequelize.js'
connect(()=>{
    app.listen(PORT, ()=>{
        console.log(`
    Server running!
    http://localhost:${PORT}
        `)
    })
})