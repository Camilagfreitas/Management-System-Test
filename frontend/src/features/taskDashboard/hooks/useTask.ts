import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Task } from "../types/task";
import {
  createTask,
  deleteTask,
  getFilteredTasks,
  getUserTasks,
  updateTask,
} from "../services/taskService";
import { toast } from "sonner";

export function useGetUserTasks(userId: string | number) {
  return useQuery<Task[]>({
    queryKey: ["userTasks", userId],
    queryFn: async () => {
      return await getUserTasks(userId);
    },
    enabled: !!userId,
  });
}

export function useFilteredTasks(
  userId: string,
  filters: {
    group: string;
    value: string;
  }
) {
  return useQuery<Task[]>({
    queryKey: ["filteredTasks", userId, filters],
    queryFn: async () => {
      return await getFilteredTasks(userId, filters);
    },
    enabled: !!userId,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: Omit<Task, "id">) => {
      return await createTask(task);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["filteredTasks"] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskId: string) => {
      return await deleteTask(taskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["filteredTasks"] });
      toast.success("Tarefa excluída com sucesso!");
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
      queryClient.invalidateQueries({ queryKey: ["filteredTasks"] });
      toast.success("Tarefa atualizada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar a tarefa");
    },
  });
}
