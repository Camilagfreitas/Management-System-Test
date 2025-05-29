/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserRepository } from '../../repositories/user.repository';
import { UserService } from '../user.service';
import * as hashUtils from '../../utils/hash'
import { AppError } from '../../errors/app-error';

vi.mock('../repositories/user.repository');

describe('UserService', () => {
  let userRepoMock: Partial<UserRepository>;
  let service: UserService;

  beforeEach(() => {
    userRepoMock = {
      getUserById: vi.fn(),
      getUserByEmail: vi.fn(),
      create: vi.fn(),
    };
    service = new UserService(userRepoMock as UserRepository);
    vi.resetAllMocks();
  });

  describe('getUserById', () => {
    test('should return user when found', async () => {
      const fakeUser = { id: '1', name: 'Alice', email: 'alice@example.com', password: 'hash' };
      (userRepoMock.getUserById as any).mockResolvedValue(fakeUser);

      const user = await service.getUserById('1');
      expect(user).toEqual(fakeUser);
      expect(userRepoMock.getUserById).toHaveBeenCalledWith('1');
    });

    test('should return null when user not found', async () => {
      (userRepoMock.getUserById as any).mockResolvedValue(null);

      const user = await service.getUserById('unknown');
      expect(user).toBeNull();
    });
  });

  describe('createUser', () => {
    test('should throw if email already in use', async () => {
      const existingUser = { id: '1', name: 'Bob', email: 'bob@example.com', password: 'hash' };
      (userRepoMock.getUserByEmail as any).mockResolvedValue(existingUser);

      await expect(service.createUser({ name: 'Bob', email: 'bob@example.com', password: 'pass123' })).rejects.toBeInstanceOf(AppError);
      await expect(service.createUser({ name: 'Bob', email: 'bob@example.com', password: 'pass123' })).rejects.toHaveProperty('status', 409);
    });

    test('should hash password and create user', async () => {
      (userRepoMock.getUserByEmail as any).mockResolvedValue(null);
      const fakeHash = 'hashedPassword';
      vi.spyOn(hashUtils, 'hashPassword').mockResolvedValue(fakeHash);
      const userInput = { name: 'Charlie', email: 'charlie@example.com', password: 'secret' };
      const createdUser = { id: '123', ...userInput, password: fakeHash };
      (userRepoMock.create as any).mockResolvedValue(createdUser);

      const result = await service.createUser(userInput);

      expect(hashUtils.hashPassword).toHaveBeenCalledWith(userInput.password);
      expect(userRepoMock.create).toHaveBeenCalledWith({ ...userInput, password: fakeHash });
      expect(result).toEqual(createdUser);
    });
  });
});
