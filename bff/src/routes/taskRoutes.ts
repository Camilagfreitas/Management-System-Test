import { Router } from 'express'
import taskController from '../controllers/TaskController'

const router = Router()

router.get('/users/:id/tasks', taskController.getUserTasks)
router.post('/users/:id/tasks', taskController.createTask)
router.delete('/tasks/:taskId', taskController.deleteTask)
router.patch('/tasks/:taskId', taskController.updateTask)
router.get('/users/:id/filterTasks', taskController.getFilteredTasks)

export default router