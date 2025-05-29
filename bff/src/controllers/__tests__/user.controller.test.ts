import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserService } from '../../services/user.service';
import { UserController } from '../user.controller';
import type { Request, Response } from 'express';

describe('UserController', () => {
  const mockUserService = {
    getUserById: vi.fn(),
    createUser: vi.fn(),
  } as unknown as UserService;

  const controller = new UserController(mockUserService);

  const mockRes = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  } as unknown as Response;

  const mockNext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getById should return user data', async () => {
    const req = { params: { id: 'user-1' } } as unknown as Request;
    const mockUser = { id: 'user-1', name: 'John Doe' };
    mockUserService.getUserById = vi.fn().mockResolvedValue(mockUser);

    await controller.getById(req, mockRes, mockNext);

    expect(mockUserService.getUserById).toHaveBeenCalledWith('user-1');
    expect(mockRes.json).toHaveBeenCalledWith(mockUser);
  });

  it('createUser should return new user with status 201', async () => {
    const req = { body: { name: 'Jane Doe', email: 'jane@example.com' } } as unknown as Request;
    const createdUser = { id: 'user-2', ...req.body };
    mockUserService.createUser = vi.fn().mockResolvedValue(createdUser);

    await controller.createUser(req, mockRes, mockNext);

    expect(mockUserService.createUser).toHaveBeenCalledWith(req.body);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(createdUser);
  });

  it('getById should call next on error', async () => {
    const req = { params: { id: 'user-1' } } as unknown as Request;
    const error = new Error('User not found');
    mockUserService.getUserById = vi.fn().mockRejectedValue(error);

    await controller.getById(req, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });

  it('createUser should call next on error', async () => {
    const req = { body: { name: 'Jane' } } as unknown as Request;
    const error = new Error('Validation failed');
    mockUserService.createUser = vi.fn().mockRejectedValue(error);

    await controller.createUser(req, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
