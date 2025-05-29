import { Task } from '../models/task.model';
import { AppError } from '../errors/app-error';
import { TaskRepository } from '../repositories/task.repository';
import { TaskQueryFilters } from '../types/task-filters.type';

export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async getTasksByUserIdWithFilters(userId: string, filters: TaskQueryFilters): Promise<Task[]> {
    try {
      const tasks = await this.taskRepository.getByUserIdWithFilters(userId, filters);
      return tasks ?? [];
    } catch {
      throw new AppError(500, 'Error fetching tasks');
    }
  }

  async createTaskForUser(data: Omit<Task, 'id'>): Promise<Task> {
    const created = await this.taskRepository.create(data);
    if (!created) {
      throw new AppError(500, 'Failed to create task');
    }
    return created;
  }

  async deleteTask(taskId: string): Promise<void> {
    const deleted = await this.taskRepository.delete(taskId);
    if (!deleted) {
      throw new AppError(404, 'Task not found');
    }
  }

  async updateTask(taskId: string, updates: Partial<Task>): Promise<Task> {
    const updated = await this.taskRepository.update(taskId, updates);
    if (!updated) {
      throw new AppError(404, 'Task not found');
    }
    return updated;
  }

  async getById(taskId: string): Promise<Task> {
    const task = await this.taskRepository.getById(taskId);
    if (!task) {
      throw new AppError(404, 'Task not found');
    }
    return task;
  }
}
