import { Router } from 'express'
import userRoutes from './userRoutes'
import taskRoutes from './taskRoutes'
import authRoutes from './authRoutes'

const router = Router()
router.use('/users', userRoutes)
router.use('/', taskRoutes)
router.use('/', authRoutes)

export default router