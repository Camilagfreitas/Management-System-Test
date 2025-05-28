import { Task } from '../models/Task';
import taskRepository from '../repositories/taskRepository';

export default {
  async getTasksByUserId(userId: number): Promise<Task[]> {
    return await taskRepository.getByUserId(userId);
  },

  async createTaskForUser(userId: string, data: Partial<Task>): Promise<Task> {
    return await taskRepository.create({ ...data, userId });
  },

  async deleteTask(taskId: string): Promise<boolean> {
    return await taskRepository.delete(taskId);
  },

  async updateTask(
    taskId: string,
    updates: Partial<Task>,
  ): Promise<Task | null> {
    return await taskRepository.update(taskId, updates);
  },
  
  async getFilteredTasks(filters: any) {
    return await taskRepository.getWithFilters(filters);
  },
};
