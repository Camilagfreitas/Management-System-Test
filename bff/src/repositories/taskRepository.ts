import axios from 'axios'
import { Task } from '../models/Task'
import qs from 'qs'

const baseURL = process.env.JSON_SERVER_URL || 'http://localhost:3001'

export default {
    async getByUserId(userId: number): Promise<Task[]> {
        const res = await axios.get(`${baseURL}/tasks?userId=${userId}`)
        return res.data
    },

    async create(task: Partial<Task>): Promise<Task> {
        const res = await axios.post(`${baseURL}/tasks`, task)
        return res.data
    },

    async delete(id: string): Promise<boolean> {
        try {
            await axios.delete(`${baseURL}/tasks/${id}`)
            return true
        } catch (e) {
            return false
        }
    },

    async update(taskId: string, updates: Partial<Task>): Promise<Task | null> {
        try {
            const res = await axios.patch(`${baseURL}/tasks/${taskId}`, updates)
            return res.data
        } catch (err) {
            return null
        }
    },
    async getWithFilters(filters: any) {
        const queryString = qs.stringify(filters)
        const res = await axios.get(`${baseURL}/tasks?${queryString}`)
        return res.data
    }
}