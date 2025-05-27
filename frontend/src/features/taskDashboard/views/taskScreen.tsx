import TaskList from "./taskList";
import { useState } from "react";
import { Button } from "@/ui/components/button";
import NewTaskModal from "./newTaskModal";
import { Input } from "@/ui/components/input";
import EditTaskModal from "./editTaskModal";
import type { Task } from "../types/task";
import Header from "@/shared/components/header";
import { ComboboxPopover } from "@/ui/components/combobox";
import { filterGroups } from "../utils/taskUtils";

export default function TaskScreen() {
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>({} as Task);
  const [filter, setFilter] = useState<{
    group: string;
    value: string;
    label: string;
  } | null>(null);

  const [search, setSearch] = useState("");

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen p-6 pt-22">
        <h1 className="text-3xl font-extrabold mb-4 text-blue-700">
          Lista de Tarefas
        </h1>

        <div className="flex justify-end">
          <Button
            variant="default"
            className="rounded-full px-6 py-3 shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setIsNewTaskModalOpen(true)}
          >
            Adicionar nova tarefa
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6">
          <Input
            placeholder="Buscar por título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:max-w-md border border-gray-300 rounded-lg text-gray-700 bg-white"
          />
          <ComboboxPopover
            groups={filterGroups}
            selected={filter}
            onChange={setFilter}
          />
        </div>

        <TaskList
          userId={1}
          search={search}
          selectTask={(task) => setSelectedTask(task)}
          setEditTaskModalOpen={setIsEditTaskModalOpen}
        />

        <NewTaskModal
          isOpen={isNewTaskModalOpen}
          onClose={() => setIsNewTaskModalOpen(false)}
        />
        <EditTaskModal
          isOpen={isEditTaskModalOpen}
          onClose={() => setIsEditTaskModalOpen(false)}
          task={selectedTask}
        />
      </div>
    </>
  );
}
