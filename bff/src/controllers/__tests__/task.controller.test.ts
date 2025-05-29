import { describe, expect, vi, beforeEach, test } from 'vitest';
import { Request, Response } from 'express';
import { TaskService } from '../../services/task.service';
import { TaskController } from '../task.controller';

describe('TaskController', () => {
  const mockTaskService = {
      getTasksByUserIdWithFilters: vi.fn(),
      createTaskForUser: vi.fn(),
      getById: vi.fn(),
      updateTask: vi.fn(),
      deleteTask: vi.fn(),
  } as unknown as TaskService;

  const controller = new TaskController(mockTaskService);

  const mockRes = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
    send: vi.fn(),
  } as unknown as Response;

  const mockNext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('listByUser should return filtered tasks', async () => {
    const req = { params: { userId: '123' }, query: { status: 'done' } } as unknown as Request;
    const fakeTasks = [{ id: '1', title: 'Test' }];
    mockTaskService.getTasksByUserIdWithFilters = vi.fn().mockResolvedValue(fakeTasks);

    await controller.listByUser(req, mockRes, mockNext);

    expect(mockTaskService.getTasksByUserIdWithFilters).toHaveBeenCalledWith('123', { status: 'done' });
    expect(mockRes.json).toHaveBeenCalledWith(fakeTasks);
  });

  test('createForUser should return created task with status 201', async () => {
    const req = { body: { title: 'New Task' } } as unknown as Request;
    const createdTask = { id: '1', title: 'New Task' };
    mockTaskService.createTaskForUser = vi.fn().mockResolvedValue(createdTask);

    await controller.createForUser(req, mockRes, mockNext);

    expect(mockTaskService.createTaskForUser).toHaveBeenCalledWith({ title: 'New Task' });
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(createdTask);
  });

  test('getById should return task by id', async () => {
    const req = { params: { id: 'task-1' } } as unknown as Request;
    const task = { id: 'task-1', title: 'Read a book' };
    mockTaskService.getById = vi.fn().mockResolvedValue(task);

    await controller.getById(req, mockRes, mockNext);

    expect(mockTaskService.getById).toHaveBeenCalledWith('task-1');
    expect(mockRes.json).toHaveBeenCalledWith(task);
  });

  test('update should return updated task', async () => {
    const req = { params: { id: 'task-1' }, body: { title: 'Updated' } } as unknown as Request;
    const updatedTask = { id: 'task-1', title: 'Updated' };
    mockTaskService.updateTask = vi.fn().mockResolvedValue(updatedTask);

    await controller.update(req, mockRes, mockNext);

    expect(mockTaskService.updateTask).toHaveBeenCalledWith('task-1', { title: 'Updated' });
    expect(mockRes.json).toHaveBeenCalledWith(updatedTask);
  });

  test('delete should call service and return 204', async () => {
    const req = { params: { id: 'task-1' } } as unknown as Request;
    mockTaskService.deleteTask = vi.fn().mockResolvedValue(undefined);

    await controller.delete(req, mockRes, mockNext);

    expect(mockTaskService.deleteTask).toHaveBeenCalledWith('task-1');
    expect(mockRes.status).toHaveBeenCalledWith(204);
    expect(mockRes.send).toHaveBeenCalled();
  });

  test('should call next on service error', async () => {
    const req = { params: { id: 'task-1' } } as unknown as Request;
    const error = new Error('Something went wrong');
    mockTaskService.getById = vi.fn().mockRejectedValue(error);

    await controller.getById(req, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
