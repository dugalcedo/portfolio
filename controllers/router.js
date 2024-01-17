import path from 'path'

import express from 'express'
const router = express.Router()

// ### Controllers ### //
import userController from './auth/user-controller.js'

router.get('/', (req, res) => {
    res.sendFile('../frontend/dist/index.html')
})

router.use('/api/user', userController)

export default router