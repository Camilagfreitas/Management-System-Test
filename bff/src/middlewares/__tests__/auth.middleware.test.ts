// tests/middlewares/ensureAuth.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ensureAuth } from '../auth.middleware';
import { AppError } from '../../errors/app-error';
import * as jwtUtils from '../../utils/jwt';
import type { Request, Response, NextFunction } from 'express';


describe('ensureAuth middleware', () => {
  let mockReq: Request;
  let mockRes: Response;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = { headers: {} } as Partial<Request> as Request;
    mockRes = {} as Partial<Response> as Response;
    mockNext = vi.fn();
  });

  test('throws AppError if no Authorization header', () => {
    expect(() => ensureAuth(mockReq, mockRes, mockNext)).toThrow(AppError);
    try {
      ensureAuth(mockReq, mockRes, mockNext);
    } catch (err) {
        if (err instanceof AppError) {
            expect(err.status).toBe(401);
            expect(err.message).toBe('Token not provided');
        } 
    }
  });

  test('throws AppError if Authorization header does not start with Bearer', () => {
    mockReq.headers.authorization = 'Basic abcdef';
    expect(() => ensureAuth(mockReq, mockRes, mockNext)).toThrow(AppError);
    try {
      ensureAuth(mockReq, mockRes, mockNext);
    } catch (err) {
      if (err instanceof AppError) {
        expect(err.status).toBe(401);
        expect(err.message).toBe('Token not provided');
      } 
    }
  });

  test('throws AppError if token is invalid', () => {
    mockReq.headers.authorization = 'Bearer invalidtoken';

    vi.spyOn(jwtUtils, 'verifyToken').mockImplementation(() => {
      throw new Error('Invalid token');
    });

    expect(() => ensureAuth(mockReq, mockRes, mockNext)).toThrow(AppError);
    try {
      ensureAuth(mockReq, mockRes, mockNext);
    } catch (err) {
      if (err instanceof AppError) {
        expect(err.status).toBe(401);
        expect(err.message).toBe('Invalid token');
      } 
    }
  });

  test('calls next and attaches decoded user if token is valid', () => {
    const decodedUser = { id: '123', email: 'test@example.com' };
    mockReq.headers.authorization = 'Bearer validtoken';

    vi.spyOn(jwtUtils, 'verifyToken').mockReturnValue(decodedUser);

    ensureAuth(mockReq, mockRes, mockNext);

    expect(mockReq.user).toEqual(decodedUser);
    expect(mockNext).toHaveBeenCalled();
  });
});
