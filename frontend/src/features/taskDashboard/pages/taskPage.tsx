import { useState } from "react";
import type { Task } from "../types/task";
import { filterGroups } from "../utils/taskUtils";
import EditTaskModal from "../components/editTaskModal";
import NewTaskModal from "../components/newTaskModal";
import TaskList from "../components/taskList";
import { useFilteredTasks } from "../hooks/useTask";
import { useAuth } from "@/features/auth/context/authContext";
import { FallbackWrapper } from "@/shared/layout/fallbackWrapper";
import { Button } from "@/ui/components/button";
import { ComboboxPopover } from "@/ui/components/combobox";
import { Input } from "@/ui/components/input";

export default function TaskPage() {
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>({} as Task);
  const [filter, setFilter] = useState<{
    group: string;
    value: string;
  }>({ group: "", value: "" });

  const [search, setSearch] = useState("");
  const { userId } = useAuth();

  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useFilteredTasks(userId, filter);

  return (
    <FallbackWrapper isLoading={isLoading} isError={isError} error={error}>
      <div className="bg-gray-100 min-h-screen p-20 pt-36">
        <h1 className="text-4xl mb-4 text-cyan-800 text-center">
          Lista de Tarefas
        </h1>

        <div className="flex justify-end">
          <Button
            variant="default"
            className="rounded-full px-6 py-3 shadow-lg bg-cyan-600 hover:bg-cyan-800 text-white"
            onClick={() => setIsNewTaskModalOpen(true)}
          >
            Adicionar nova tarefa
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center pt-6 gap-12">
          <Input
            placeholder="Buscar por título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80 sm:max-w-md border border-gray-300 rounded-l text-gray-700 bg-white"
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
    </FallbackWrapper>
  );
}
