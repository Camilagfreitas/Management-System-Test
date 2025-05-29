/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TaskRepository } from '../../repositories/task.repository';
import { TaskService } from '../task.service';
import { AppError } from '../../errors/app-error';

vi.mock('../repositories/task.repository');

describe('TaskService', () => {
  let taskRepoMock: Partial<TaskRepository>;
  let service: TaskService;

  beforeEach(() => {
    taskRepoMock = {
      getByUserIdWithFilters: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
      update: vi.fn(),
      getById: vi.fn(),
    };
    service = new TaskService(taskRepoMock as TaskRepository);
    vi.resetAllMocks();
  });

  describe('getTasksByUserIdWithFilters', () => {
    it('should return tasks when found', async () => {
      const fakeTasks = [{ id: '1', title: 'Task 1', userId: 'user1' }];
      (taskRepoMock.getByUserIdWithFilters as any).mockResolvedValue(fakeTasks);

      const tasks = await service.getTasksByUserIdWithFilters('user1', { status: 'open' });
      expect(tasks).toEqual(fakeTasks);
      expect(taskRepoMock.getByUserIdWithFilters).toHaveBeenCalledWith('user1', { status: 'open' });
    });

    it('should return empty array if no tasks found', async () => {
      (taskRepoMock.getByUserIdWithFilters as any).mockResolvedValue([]);

      const tasks = await service.getTasksByUserIdWithFilters('user1', { status: 'open' });
      expect(tasks).toEqual([]);
    });
  });

  describe('createTaskForUser', () => {
    it('should create and return task', async () => {
      const input = { title: 'New Task', userId: 'user1', description: 'Test Task', category: 'work', priority: 'high' as const, status: 'pending' as const };
      const created = { id: '123', ...input };
      (taskRepoMock.create as any).mockResolvedValue(created);

      const result = await service.createTaskForUser(input);
      expect(result).toEqual(created);
      expect(taskRepoMock.create).toHaveBeenCalledWith(input);
    });

    it('should throw AppError if creation failed', async () => {
      (taskRepoMock.create as any).mockResolvedValue(null);

      await expect(service.createTaskForUser({
          title: 'Fail', userId: 'user1',
          description: '',
          category: '',
          priority: 'high',
          status: 'pending'
      })).rejects.toBeInstanceOf(AppError);
      await expect(service.createTaskForUser({
          title: 'Fail', userId: 'user1',
          description: '',
          category: '',
          priority: 'high',
          status: 'pending'
      })).rejects.toHaveProperty('status', 500);
    });
  });

  describe('deleteTask', () => {
    it('should delete successfully', async () => {
      (taskRepoMock.delete as any).mockResolvedValue(true);

      await expect(service.deleteTask('task-1')).resolves.toBeUndefined();
      expect(taskRepoMock.delete).toHaveBeenCalledWith('task-1');
    });

    it('should throw AppError if task not found', async () => {
      (taskRepoMock.delete as any).mockResolvedValue(false);

      await expect(service.deleteTask('task-404')).rejects.toBeInstanceOf(AppError);
      await expect(service.deleteTask('task-404')).rejects.toHaveProperty('status', 404);
    });
  });

  describe('updateTask', () => {
    it('should update and return task', async () => {
      const updatedTask = { id: 'task-1', title: 'Updated Task' };
      (taskRepoMock.update as any).mockResolvedValue(updatedTask);

      const result = await service.updateTask('task-1', { title: 'Updated Task' });
      expect(result).toEqual(updatedTask);
      expect(taskRepoMock.update).toHaveBeenCalledWith('task-1', { title: 'Updated Task' });
    });

    it('should throw AppError if task not found', async () => {
      (taskRepoMock.update as any).mockResolvedValue(null);

      await expect(service.updateTask('task-404', { title: 'Nope' })).rejects.toBeInstanceOf(AppError);
      await expect(service.updateTask('task-404', { title: 'Nope' })).rejects.toHaveProperty('status', 404);
    });
  });

  describe('getById', () => {
    it('should return task if found', async () => {
      const task = { id: 'task-1', title: 'Found Task' };
      (taskRepoMock.getById as any).mockResolvedValue(task);

      const result = await service.getById('task-1');
      expect(result).toEqual(task);
      expect(taskRepoMock.getById).toHaveBeenCalledWith('task-1');
    });

    it('should throw AppError if task not found', async () => {
      (taskRepoMock.getById as any).mockResolvedValue(null);

      await expect(service.getById('missing')).rejects.toBeInstanceOf(AppError);
      await expect(service.getById('missing')).rejects.toHaveProperty('status', 404);
    });
  });
});
