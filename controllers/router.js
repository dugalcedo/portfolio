import express from 'express'
const router = express.Router()

// ### Controllers ### //
import userController from './auth/user-controller.js'

router.use('/api/user', userController)

export default router