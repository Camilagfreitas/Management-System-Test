import { useState } from "react";
import { Button } from "@/ui/components/button";
import { Input } from "@/ui/components/input";
import type { Task } from "../types/task";
import { ComboboxPopover } from "@/ui/components/combobox";
import { filterGroups } from "../utils/taskUtils";
import EditTaskModal from "./components/editTaskModal";
import NewTaskModal from "./components/newTaskModal";
import TaskList from "./components/taskList";
import { useFilteredTasks } from "../hooks/useTask";

export default function TaskScreen() {
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>({} as Task);
  const [filter, setFilter] = useState<{
    group: string;
    value: string;
  }>({ group: "", value: "" });

  const [search, setSearch] = useState("");
  const { data: tasks } = useFilteredTasks("1", filter);

  return (
    <>
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
            onChange={(option) => setFilter(option ?? { group: "", value: "" })}
          />
        </div>

        <TaskList
          tasks={tasks}
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
