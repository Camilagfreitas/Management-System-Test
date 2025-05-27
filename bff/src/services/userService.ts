import { User } from "../models/User"
import userRepository from "../repositories/userRepository"

export default {
    async getUsers(): Promise<User[]> {
    return await userRepository.fetchAll()
  },

  async getUserByEmail(email: string): Promise<User | null> {
    return await userRepository.fetchByEmail(email)
  },

  async createUser(user: User): Promise<User> {
    return await userRepository.create(user)
  },
  
}