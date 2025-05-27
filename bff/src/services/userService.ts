import { User } from '../models/User';
import { UserRepository } from '../repositories/userRepository';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.fetchAll();
  }
  
  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.fetchByEmail(email);
  }

  async createUser(user: User): Promise<User> {
    return await this.userRepository.create(user);
  }
}

