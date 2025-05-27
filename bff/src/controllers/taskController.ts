import { Request, Response } from 'express'
import taskService from '../services/TaskService'

export default {
  async getUserTasks(req: Request, res: Response) {
    const userId = Number(req.params.id)
    const tasks = await taskService.getTasksByUserId(userId)
    res.json(tasks)
  },
  async createTask(req: Request, res: Response) {
    const userId = req.params.id;
    const newTask = req.body
    const created = await taskService.createTaskForUser(userId, newTask)
    res.status(201).json(created)
  },
  async deleteTask(req: Request, res: Response) {
    const taskId = req.params.taskId
    const success = await taskService.deleteTask(taskId)
    if (success) {
      res.status(204).send()
    } else {
      res.status(404).json({ message: 'Task not found' })
    }
},
async updateTask(req: Request, res: Response) {
    const taskId = req.params.taskId
    const updatedTask = req.body
    const success = await taskService.updateTask(taskId, updatedTask)
    if (success) {
      res.status(200).json(success)
    } else {
      res.status(404).json({ message: 'Task not found' })
    }
  },
async getFilteredTasks(req: Request, res: Response) {
  const filters = req.query 
  const tasks = await taskService.getFilteredTasks(filters)
  res.json(tasks)
}

}
