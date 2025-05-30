import axios from 'axios';
import { vi, describe, expect, beforeEach, test } from 'vitest';
import { UserRepository } from '../user.repository';

vi.mock('axios');

const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
};

describe('UserRepository', () => {
  let repo: UserRepository;

  beforeEach(() => {
    repo = new UserRepository();
    vi.clearAllMocks();
  });

  describe('getUserById', () => {
    test('should return user when axios resolves with data', async () => {
      const fakeUser = { id: '123', name: 'John Doe', email: 'john@example.com', password: 'hash' };
      mockedAxios.get = vi.fn().mockResolvedValue({ data: [fakeUser] });

      const user = await repo.getUserById('123');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.JSON_SERVER_URL || 'http://localhost:3001'}/users?id=123`
      );
      expect(user).toEqual(fakeUser);
    });

    test('should return null when axios resolves with empty array', async () => {
      mockedAxios.get = vi.fn().mockResolvedValue({ data: [] });

      const user = await repo.getUserById('123');

      expect(user).toBeNull();
    });

    test('should return null when axios throws', async () => {
      mockedAxios.get = vi.fn().mockRejectedValue(new Error('fail'));

      const user = await repo.getUserById('123');

      expect(user).toBeNull();
    });
  });

  describe('getUserByEmail', () => {
    test('should return user when axios resolves with data', async () => {
      const fakeUser = { id: '123', name: 'John Doe', email: 'john@example.com', password: 'hash' };
      mockedAxios.get = vi.fn().mockResolvedValue({ data: [fakeUser] });

      const user = await repo.getUserByEmail('john@example.com');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.JSON_SERVER_URL || 'http://localhost:3001'}/users?email=john@example.com`
      );
      expect(user).toEqual(fakeUser);
    });

    test('should return null when axios resolves with empty array', async () => {
      mockedAxios.get = vi.fn().mockResolvedValue({ data: [] });

      const user = await repo.getUserByEmail('john@example.com');

      expect(user).toBeNull();
    });

    test('should return null when axios throws', async () => {
      mockedAxios.get = vi.fn().mockRejectedValue(new Error('fail'));

      const user = await repo.getUserByEmail('john@example.com');

      expect(user).toBeNull();
    });
  });

  describe('create', () => {
    test('should call axios.post and return created user', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com', password: 'pass123' };
      const createdUser = { id: 'uuid-1234', ...userData };

      mockedAxios.post = vi.fn().mockResolvedValue({ data: createdUser });

      const result = await repo.create(userData);

      expect(mockedAxios.post).toHaveBeenCalled();
      const callArgs = mockedAxios.post.mock.calls[0];
      const url = callArgs[0];
      const sentUser = callArgs[1];

      expect(url).toBe(`${process.env.JSON_SERVER_URL || 'http://localhost:3001'}/users`);
      expect(sentUser).toMatchObject(userData);
      expect(sentUser.id).toBeDefined();

      expect(result).toEqual(createdUser);
    });
  });
});
