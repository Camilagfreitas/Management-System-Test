import api from "@/lib/api";
import API_ROUTES from "@/services/apiRoutes";
import type { Task } from "../types/task";
export const createTask = async (task: Omit<Task, "id">) => {
  const response = await api.post(API_ROUTES.CREATE_TASK, task);
  return response.data;
};

export const updateTask = async (
  taskId: string,
  updatedData: Partial<Task>
) => {
  const response = await api.put(API_ROUTES.TASK_BY_ID(taskId), updatedData);
  return response.data;
};

export const deleteTask = async (taskId: string) => {
  const response = await api.delete(API_ROUTES.TASK_BY_ID(taskId));
  return response.data;
};

export const getFilteredTasks = async (
  userId: string,
  filter?: {
    group: string;
    value: string;
  }
) => {
  const mappedFilters =
    filter && filter.group
      ? { [filter.group.toLowerCase()]: filter.value }
      : {};

  const params = new URLSearchParams(mappedFilters).toString();

  const url = `${API_ROUTES.GET_TASKS(userId)}${params ? `?${params}` : ""}`;

  const response = await api.get(url);
  return response.data;
};
