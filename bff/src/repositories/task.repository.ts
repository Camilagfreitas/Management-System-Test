import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import qs from 'qs';
import { Task } from '../models/task.model';
import { TaskQueryFilters } from '../types/task-filters.type';

const baseURL = process.env.JSON_SERVER_URL || 'http://localhost:3001';

export class TaskRepository {
  
  async getByUserIdWithFilters(userId: string, filters: TaskQueryFilters): Promise<Task[]> {
    const fullFilters = { userId, ...filters };
    const queryString = qs.stringify(fullFilters);
    const res = await axios.get(`${baseURL}/tasks?${queryString}`);
    return res.data;
  }

  async create(task: Omit<Task, 'id'>): Promise<Task> {
    const id = uuidv4();

    const res = await axios.post(`${baseURL}/tasks`, { id, ...task });
    return res.data;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await axios.delete(`${baseURL}/tasks/${id}`);
      return true;
    } catch {
      return false;
    }
  }

  async update(taskId: string, updates: Partial<Task>): Promise<Task | null> {
    try {
      const res = await axios.patch(`${baseURL}/tasks/${taskId}`, updates);
      return res.data;
    } catch {
      return null;
    }
  }

  async getById(taskId: string): Promise<Task | null> {
    try {
      const res = await axios.get(`${baseURL}/tasks/${taskId}`);
      return res.data;
    } catch {
      return null;
    }
  }
}