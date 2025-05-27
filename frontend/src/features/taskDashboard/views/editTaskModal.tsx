import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { useUpdateTask } from "../hooks/useTask"; // seu hook para update

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  userId: string;
  status: string;
}

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

export default function EditTaskModal({ isOpen, onClose, task }: EditTaskModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [category, setCategory] = useState(task.category);
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">(task.priority);

  const updateTask = useUpdateTask();

  const handleSubmit = () => {
    if (!title || !description || !category || !priority) return;

    updateTask.mutate(
      {
        id: task.id,
        title,
        description,
        category,
        priority,
        userId: task.userId,
        status: task.status as "Pending" | "InProgress" | "Completed",
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-md">
        <DialogHeader>
          <DialogTitle className="text-blue-700 text-xl font-semibold mb-2">
            Editar Tarefa
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100"
          />

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100"
          />

          <Select onValueChange={setCategory} defaultValue={category}>
            <SelectTrigger className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 text-gray-500">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Work">Trabalho</SelectItem>
              <SelectItem value="Personal">Pessoal</SelectItem>
              <SelectItem value="Study">Estudos</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setPriority(value as "High" | "Medium" | "Low")} defaultValue={priority}>
            <SelectTrigger className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 text-gray-500">
              <SelectValue placeholder="Selecione a prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High">Alta</SelectItem>
              <SelectItem value="Medium">Média</SelectItem>
              <SelectItem value="Low">Baixa</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="ghost"
              className="text-gray-600 hover:bg-gray-100"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={updateTask.isPending}
            >
              {updateTask.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
