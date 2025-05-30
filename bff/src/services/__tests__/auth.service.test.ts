/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, vi, beforeEach, test } from 'vitest';
import { AuthService } from '../auth.service';
import { UserRepository } from '../../repositories/user.repository';
import * as hashUtils from '../../utils/hash';
import * as jwtUtils from '../../utils/jwt';
import { AppError } from '../../errors/app-error';

vi.mock('../../repositories/user.repository');
vi.mock('../../utils/hash');
vi.mock('../../utils/jwt');

describe('AuthService', () => {
  let authService: AuthService;
  let userRepoMock: Partial<UserRepository>;

  beforeEach(() => {
    userRepoMock = {
      getUserByEmail: vi.fn(),
    };

    authService = new AuthService(userRepoMock as UserRepository);

    vi.resetAllMocks();
  });

  test('should login successfully with valid credentials', async () => {
    const fakeUser = {
      id: 'user-id-1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed-password',
    };

    (userRepoMock.getUserByEmail as any).mockResolvedValue(fakeUser);
    (hashUtils.comparePassword as any).mockResolvedValue(true);
    (jwtUtils.generateToken as any).mockReturnValue('fake-jwt-token');

    const result = await authService.login('john@example.com', 'valid-password');

    expect(userRepoMock.getUserByEmail).toHaveBeenCalledWith('john@example.com');
    expect(hashUtils.comparePassword).toHaveBeenCalledWith('valid-password', fakeUser.password);
    expect(jwtUtils.generateToken).toHaveBeenCalledWith({ id: fakeUser.id, email: fakeUser.email });
    expect(result).toEqual({
      id: fakeUser.id,
      name: fakeUser.name,
      token: 'fake-jwt-token',
    });
  });

  test('should throw AppError when user does not exist', async () => {
    (userRepoMock.getUserByEmail as any).mockResolvedValue(null);

    await expect(authService.login('notfound@example.com', 'any-password')).rejects.toBeInstanceOf(AppError);
    await expect(authService.login('notfound@example.com', 'any-password')).rejects.toHaveProperty('status', 401);
  });

  test('should throw AppError when password is invalid', async () => {
    const fakeUser = {
      id: 'user-id-2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'hashed-password',
    };

    (userRepoMock.getUserByEmail as any).mockResolvedValue(fakeUser);
    (hashUtils.comparePassword as any).mockResolvedValue(false);

    await expect(authService.login('jane@example.com', 'wrong-password')).rejects.toBeInstanceOf(AppError);
    await expect(authService.login('jane@example.com', 'wrong-password')).rejects.toHaveProperty('status', 401);
  });
});
