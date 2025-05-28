import { AppError } from '../errors/app-error';
import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { hashPassword } from '../utils/hash';

export class UserService {
  constructor(private userRepository: UserRepository) {}
  
  async getUserById(id: string): Promise<User | null> {
    return await this.userRepository.getUserById(id);
  }

  async createUser(data: Omit<User, 'id'>): Promise<User> {
    const existingUser = await this.userRepository.getUserByEmail(data.email);
    if (existingUser) {
      throw new AppError(409, 'Email already in use', );
    }

    const passwordHash = await hashPassword(data.password);

    const userToSave = {
      ...data,
      password: passwordHash,
    };

    return await this.userRepository.create(userToSave);
  }
}

