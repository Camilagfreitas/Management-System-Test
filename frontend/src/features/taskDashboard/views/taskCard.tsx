import { Button } from "@/components/ui/button";
import type { Task } from "../types/task";
import { Pencil, Trash2 } from "lucide-react";
import { useDeleteTask, useUpdateTask } from "../hooks/useTask";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskCardProps {
  task: Task;
  selectTask?: (task: Task) => void;
  setEditTaskModalOpen?: (open: boolean) => void;
}

export default function TaskCard({
  task,
  selectTask,
  setEditTaskModalOpen,
}: TaskCardProps) {
  const deleteTask = useDeleteTask();
  const updateTask = useUpdateTask();

  const handleStatusChange = (newStatus: string) => {
    if (newStatus !== task.status) {
      updateTask.mutate({ ...task, status: newStatus as Task["status"] });
    }
  };

  return (
    <li className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg relative">
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant={"ghost"}
          size="icon"
          onClick={() => {
            selectTask?.(task);
            setEditTaskModalOpen?.(true);
          }}
        >
          <Pencil className="h-5 w-5 text-blue-500 hover:text-blue-700" />
        </Button>
        <Button
          variant={"ghost"}
          size="icon"
          onClick={() => deleteTask.mutate(task.id)}
        >
          <Trash2 className="h-5 w-5 text-gray-500 hover:text-gray-700" />
        </Button>
      </div>

      <h2 className="text-xl font-semibold text-blue-600 mb-2 truncate">{task.title}</h2>
      <p className="text-gray-700 mb-4">{task.description}</p>

      <div className="flex flex-wrap gap-3 text-sm items-center">
        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
          Categoria: {task.category}
        </span>
        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
          Prioridade: {task.priority}
        </span>

        <Select value={task.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pendente</SelectItem>
            <SelectItem value="InProgress">Em Andamento</SelectItem>
            <SelectItem value="Completed">Concluída</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </li>
  );
}
