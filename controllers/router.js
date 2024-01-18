import path from 'path'

import express from 'express'
const router = express.Router()

// ### Controllers ### //
import userController from './auth/user-controller.js'
import postController from './auth/post-controller.js'

router.get('/', (req, res) => {
    res.sendFile('../frontend/dist/index.html')
})

router.use('/api/user', userController)
router.use('/api/post', postController)

export default router