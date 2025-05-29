import {
  priorityColors,
  translateCategoryAndPriority,
} from "../../utils/taskUtils";
import type { Task } from "../../types/task";
import { useDeleteTask, useUpdateTask } from "../../hooks/useTask";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
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
          <Pencil className="h-5 w-5 text-cyan-500 hover:text-cyan-800" />
        </Button>
        <Button
          variant={"ghost"}
          size="icon"
          onClick={() => deleteTask.mutate(task.id)}
        >
          <Trash2 className="h-5 w-5 text-gray-500 hover:text-gray-700" />
        </Button>
      </div>

      <h2 className="text-xl font-semibold text-cyan-600 mb-2 truncate">
        {task.title}
      </h2>
      <p className="text-gray-700 mb-4">{task.description}</p>

      <div className="flex flex-wrap gap-3 text-sm items-center">
        <span className="inline-block bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full font-medium">
          Categoria: {translateCategoryAndPriority(task.category)}
        </span>
        <span
          className={`inline-block px-3 py-1 rounded-full font-medium ${
            priorityColors[task.priority]
          }`}
        >
          Prioridade: {translateCategoryAndPriority(task.priority)}
        </span>

        <Select value={task.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full font-medium w-[160px]">
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
