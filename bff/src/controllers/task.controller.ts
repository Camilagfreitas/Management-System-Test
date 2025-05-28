import { NextFunction, Request, Response } from 'express'
import { TaskService } from '../services/task.service';

export class TaskController {
  constructor(private taskService: TaskService) {}

  listByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const filters = req.query;
      const tasks = await this.taskService.getTasksByUserIdWithFilters(userId, filters);
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  };

  createForUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskData = req.body;
      const created = await this.taskService.createTaskForUser(taskData);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId = req.params.id;
      const task = await this.taskService.getById(taskId);
      res.json(task);
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId = req.params.id;
      const updates = req.body;
      const updated = await this.taskService.updateTask(taskId, updates);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId = req.params.id;
      await this.taskService.deleteTask(taskId);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}