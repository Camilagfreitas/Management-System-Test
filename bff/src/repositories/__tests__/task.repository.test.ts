import axios from 'axios';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import qs from 'qs';
import { TaskRepository } from '../task.repository';

vi.mock('axios');

const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
  patch: ReturnType<typeof vi.fn>;
};

describe('TaskRepository', () => {
  let repo: TaskRepository;

  beforeEach(() => {
    repo = new TaskRepository();
    vi.clearAllMocks();
  });

  describe('getByUserIdWithFilters', () => {
    it('should call axios.get with correct URL and return tasks', async () => {
      const userId = 'user123';
      const filters = { status: 'pending', priority: 'high' };
      const fakeTasks = [{ id: '1', title: 'task 1' }];

      mockedAxios.get = vi.fn().mockResolvedValue({ data: fakeTasks });

      const tasks = await repo.getByUserIdWithFilters(userId, filters);

      const expectedQuery = qs.stringify({ userId, ...filters });
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.JSON_SERVER_URL || 'http://localhost:3001'}/tasks?${expectedQuery}`
      );

      expect(tasks).toEqual(fakeTasks);
    });
  });

  describe('create', () => {
    it('should call axios.post with task data including generated id', async () => {
      const newTask = {
        title: 'New Task',
        userId: 'user123',
        description: 'Test description',
        category: 'work',
        priority: 'high' as const,
        status: 'pending' as const
      };
      const fakeCreatedTask = { id: 'uuid-1234', ...newTask };

      mockedAxios.post = vi.fn().mockResolvedValue({ data: fakeCreatedTask });

      const result = await repo.create(newTask);

      expect(mockedAxios.post).toHaveBeenCalled();
      const callArgs = mockedAxios.post.mock.calls[0];
      const sentTask = callArgs[1];

      expect(sentTask).toMatchObject(newTask);
      expect(sentTask.id).toBeDefined();

      expect(result).toEqual(fakeCreatedTask);
    });
  });

  describe('delete', () => {
    it('should return true if delete succeeds', async () => {
      mockedAxios.delete = vi.fn().mockResolvedValue({ status: 200 });

      const result = await repo.delete('task-id');

      expect(mockedAxios.delete).toHaveBeenCalledWith(
        `${process.env.JSON_SERVER_URL || 'http://localhost:3001'}/tasks/task-id`
      );
      expect(result).toBe(true);
    });

    it('should return false if delete throws', async () => {
      mockedAxios.delete = vi.fn().mockRejectedValue(new Error('fail'));

      const result = await repo.delete('task-id');

      expect(result).toBe(false);
    });
  });

  describe('update', () => {
    it('should return updated task on success', async () => {
      const updates = { title: 'Updated' };
      const updatedTask = { id: 'task1', title: 'Updated' };

      mockedAxios.patch = vi.fn().mockResolvedValue({ data: updatedTask });

      const result = await repo.update('task1', updates);

      expect(mockedAxios.patch).toHaveBeenCalledWith(
        `${process.env.JSON_SERVER_URL || 'http://localhost:3001'}/tasks/task1`,
        updates
      );
      expect(result).toEqual(updatedTask);
    });

    it('should return null on failure', async () => {
      mockedAxios.patch = vi.fn().mockRejectedValue(new Error('fail'));

      const result = await repo.update('task1', { title: 'Updated' });

      expect(result).toBeNull();
    });
  });

  describe('getById', () => {
    it('should return task on success', async () => {
      const task = { id: 'task1', title: 'Task 1' };

      mockedAxios.get = vi.fn().mockResolvedValue({ data: task });

      const result = await repo.getById('task1');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.JSON_SERVER_URL || 'http://localhost:3001'}/tasks/task1`
      );
      expect(result).toEqual(task);
    });

    it('should return null if request fails', async () => {
      mockedAxios.get = vi.fn().mockRejectedValue(new Error('fail'));

      const result = await repo.getById('task1');

      expect(result).toBeNull();
    });
  });
});
