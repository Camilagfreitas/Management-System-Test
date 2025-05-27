import api from "@/lib/api";
import API_ROUTES from "@/services/apiRoutes";
import type { Task } from "../types/task";


export const getUserTasks = async (userId: string|number) => {
  const response = await api.get(`${API_ROUTES.USERS}/${userId}/tasks`);
  return response.data;
};

export const createTask = async (task: Omit<Task, "id">) => {
  const response = await api.post(`${API_ROUTES.USERS}/${task.userId}/tasks`, task);
  return response.data;
};

 export const updateTask = async (taskId: string, updatedData: Partial<Task>) => {
   const response = await api.patch(API_ROUTES.TASK_BY_ID(taskId), updatedData);
   return response.data;
 };

 export const deleteTask = async (taskId: string) => {
   const response = await api.delete(API_ROUTES.TASK_BY_ID(taskId));
   return response.data;
};

export const getFilteredTasks = async (
  userId: string,
  filters: { status?: string; category?: string; priority?: string; search?: string }
) => {
  const params = new URLSearchParams(filters as Record<string, string>).toString();
  const response = await api.get(`${API_ROUTES.USERS}/${userId}/filterTasks?${params}`);
  return response.data;
};
