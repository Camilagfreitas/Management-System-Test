import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import API_ROUTES from "@/services/apiRoutes";
import type { Task } from "../types/task";
import { deleteTask, getUserTasks, updateTask } from "../services/taskService";
import { toast } from "sonner";



export function useUserTasks(userId: string | number) {
  return useQuery<Task[]>({
    queryKey: ["userTasks", userId],
    queryFn: async () => {
      return await getUserTasks(userId)
    },
    enabled: !!userId,
  });
}
export function useFilteredTasks(
  userId: string,
  filters: { status?: string; category?: string; priority?: string; search?: string }
) {
  return useQuery<Task[]>({
    queryKey: ["filteredTasks", userId, filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters as Record<string, string>).toString();
      const response = await api.get(`${API_ROUTES.USERS}/${userId}/filterTasks?${params}`);
      return response.data;
    },
    enabled: !!userId,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: Omit<Task, "id">) => {
      const response = await api.post(`${API_ROUTES.USERS}/${task.userId}/tasks`, task);
      return response.data;
    },
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: ["userTasks"] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskId: string) => {
      return await deleteTask(taskId);
    },
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: ["userTasks"] });
      toast.success("Tarefa excluída com sucesso!")
    },
    onError: () => {
      toast.error("Erro ao deletar a tarefa");

    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: Task) => {
     return await updateTask(task.id, {
        title: task.title,
        description: task.description,
        category: task.category,
        priority: task.priority,
        userId: task.userId,
        status: task.status as "Pending" | "InProgress" | "Completed",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userTasks"] });
      toast.success("Tarefa atualizada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar a tarefa");
    },
  });
}
