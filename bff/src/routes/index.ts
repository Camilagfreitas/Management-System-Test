import { Router } from 'express'
import userRoutes from './user.routes'
import taskRoutes from './task.routes'
import authRoutes from './auth.routes'

const router = Router()

router.use('/users', userRoutes)
router.use('/tasks', taskRoutes)
router.use('/auth', authRoutes)

export default router