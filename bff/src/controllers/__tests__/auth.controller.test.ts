import { describe, expect, vi, beforeEach, test } from 'vitest';
import { AuthService } from '../../services/auth.service';
import { AuthController } from '../auth.controller';
import type { Request, Response, NextFunction } from 'express';

describe('AuthController', () => {
  const mockLogin = vi.fn();
  const authService = { login: mockLogin } as unknown as AuthService;
  const controller = new AuthController(authService);

  const req = {
    body: {
      email: 'camila@example.com',
      password: '123456',
    },
  } as Request;

  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  } as unknown as Response;

  const next = vi.fn() as NextFunction;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('responds with status 200 and login data when credentials are valid', async () => {
    const fakeResponse = { token: 'abc.123', user: { id: '1' } };
    mockLogin.mockResolvedValue(fakeResponse);

    await controller.login(req, res, next);

    expect(mockLogin).toHaveBeenCalledWith('camila@example.com', '123456');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeResponse);
  });

  test('calls next with error if login throws', async () => {
    const error = new Error('Invalid credentials');
    mockLogin.mockRejectedValue(error);

    await controller.login(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
