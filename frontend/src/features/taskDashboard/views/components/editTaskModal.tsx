import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/components/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/select";
import type { Task } from "../../types/task";
import { useUpdateTask } from "../../hooks/useTask";

const taskSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  category: z.enum(["Work", "Personal", "Study"]),
  priority: z.enum(["High", "Medium", "Low"]),
});

type TaskForm = z.infer<typeof taskSchema>;

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

export default function EditTaskModal({
  isOpen,
  onClose,
  task,
}: EditTaskModalProps) {
  const updateTask = useUpdateTask();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      category: task.category as "Work" | "Personal" | "Study",
      priority: task.priority,
    },
  });

  const onSubmit = (data: TaskForm) => {
    updateTask.mutate(
      {
        id: task.id,
        userId: task.userId,
        status: task.status as "Pending" | "InProgress" | "Completed",
        ...data,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose();
        reset();
      }}
    >
      <DialogContent className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-md">
        <DialogHeader>
          <DialogTitle className="text-blue-700 text-xl font-semibold mb-2">
            Editar Tarefa
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("title")}
            placeholder="Título"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100"
            defaultValue={task.title}
          />
          {errors.title && (
            <p className="text-red-600">{errors.title.message}</p>
          )}

          <textarea
            {...register("description")}
            placeholder="Descrição"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100"
            defaultValue={task.description}
          />
          {errors.description && (
            <p className="text-red-600">{errors.description.message}</p>
          )}

          <Select {...register("category")} defaultValue={task.category}>
            <SelectTrigger className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 text-gray-500">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Work">Trabalho</SelectItem>
              <SelectItem value="Personal">Pessoal</SelectItem>
              <SelectItem value="Study">Estudos</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-red-600">{errors.category.message}</p>
          )}

          <Select {...register("priority")} defaultValue={task.priority}>
            <SelectTrigger className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 text-gray-500">
              <SelectValue placeholder="Selecione a prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High">Alta</SelectItem>
              <SelectItem value="Medium">Média</SelectItem>
              <SelectItem value="Low">Baixa</SelectItem>
            </SelectContent>
          </Select>
          {errors.priority && (
            <p className="text-red-600">{errors.priority.message}</p>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
