import path from 'path'

import express from 'express'
const router = express.Router()

// ### Controllers ### //
import userController from './auth/user-controller.js'
import postController from './auth/post-controller.js'
import adminController from './admin/admin-controller.js'

router.get('/', (req, res) => {
    res.sendFile('../frontend/dist/index.html')
})

router.use('/api/user', userController)
router.use('/api/post', postController)
router.use('/admin', adminController)

export default router