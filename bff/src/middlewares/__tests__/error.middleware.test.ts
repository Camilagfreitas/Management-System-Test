// tests/middlewares/errorHandler.test.ts
import { describe, expect, vi, beforeEach, test } from 'vitest';
import { AppError } from '../../errors/app-error';
import { errorHandler } from '../error.middleware';
import type { Request, Response } from 'express';

describe('errorHandler middleware', () => {
  const mockReq = {} as Request;
  const mockNext = vi.fn();

  let mockRes: Response;

  beforeEach(() => {
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
    vi.clearAllMocks();
  });

  test('should handle AppError and return custom status and message', () => {
    const appError = new AppError(404, 'Not found');

    errorHandler(appError, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Not found' });
  });

  test('should handle unknown errors and return 500', () => {
    const genericError = new Error('Something broke');

    errorHandler(genericError, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
