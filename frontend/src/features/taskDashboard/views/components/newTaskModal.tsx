import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTask } from "../../hooks/useTask";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const taskSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  description: z.string().min(1, "Descrição obrigatória"),
  category: z.string().min(1, "Categoria obrigatória"),
  priority: z.enum(["High", "Medium", "Low"]),
});

type TaskFormData = z.infer<typeof taskSchema>;

export default function NewTaskModal({ isOpen, onClose }: NewTaskModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const createTask = useCreateTask();

  const onSubmit = (data: TaskFormData) => {
    const taskWithRequiredFields = {
      ...data,
      status: "Pending" as const,
      userId: "1", //context api
    };
    createTask.mutate(taskWithRequiredFields, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-md">
        <DialogHeader>
          <DialogTitle className="text-cyan-800 text-xl font-semibold mb-2">
            Adicionar Nova Tarefa
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Título"
            {...register("title")}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-100"
          />
          {errors.title && (
            <span className="text-sm text-red-500">{errors.title.message}</span>
          )}

          <textarea
            placeholder="Descrição"
            {...register("description")}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-100"
          />
          {errors.description && (
            <span className="text-sm text-red-500">
              {errors.description.message}
            </span>
          )}

          <Select onValueChange={(value) => setValue("category", value)}>
            <SelectTrigger className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-100 text-gray-500">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Work">Trabalho</SelectItem>
              <SelectItem value="Personal">Pessoal</SelectItem>
              <SelectItem value="Study">Estudos</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && (
            <span className="text-sm text-red-500">
              {errors.category.message}
            </span>
          )}

          <Select
            onValueChange={(value) =>
              setValue("priority", value as "High" | "Medium" | "Low")
            }
          >
            <SelectTrigger className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-100 text-gray-500">
              <SelectValue placeholder="Selecione a prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High">Alta</SelectItem>
              <SelectItem value="Medium">Média</SelectItem>
              <SelectItem value="Low">Baixa</SelectItem>
            </SelectContent>
          </Select>
          {errors.priority && (
            <span className="text-sm text-red-500">
              {errors.priority.message}
            </span>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="ghost"
              className="text-gray-600 hover:bg-gray-100"
              onClick={onClose}
              type="button"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-cyan-600 text-white hover:bg-cyan-800"
            >
              Adicionar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
