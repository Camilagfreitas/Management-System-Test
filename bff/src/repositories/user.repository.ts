import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/user.model';

const baseURL = process.env.JSON_SERVER_URL || 'http://localhost:3001';

export class UserRepository {
  
  async getUserById(id: string): Promise<User | null> {
    try {
      const res = await axios.get(`${baseURL}/users?id=${id}`);
      return res.data[0] ?? null;
    } catch {
      return null;
    }
  };

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const res = await axios.get(`${baseURL}/users?email=${email}`);
      return res.data[0] ?? null;
    } catch {
      return null;
    }
  };

  async create(user: Omit<User, 'id'>): Promise<User> {
    const id = uuidv4();
    const res = await axios.post(`${baseURL}/users`, { id, ...user });
    return res.data;
  };

}