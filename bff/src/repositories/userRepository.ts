import axios from 'axios'
import { User } from '../models/User'

const baseURL = process.env.JSON_SERVER_URL || 'http://localhost:3001'

export default {
  async fetchAll(): Promise<User[]> {
    const res = await axios.get(`${baseURL}/users`)
    return res.data
  },

  async fetchByEmail(email: string): Promise<User | null> {
    try {
      const res = await axios.get(`${baseURL}/users?email=${email}`)
      return res.data
    } catch (e) {
      return null
    }
  },

  async create(user: User): Promise<User> {
    const res = await axios.post(`${baseURL}/users`, user)
    return res.data
  },
  
}