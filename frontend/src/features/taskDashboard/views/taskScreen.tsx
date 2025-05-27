import TaskList from "./taskList";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import NewTaskModal from "./newTaskModal";
import { Input } from "@/components/ui/input"; 
import EditTaskModal from "./editTaskModal";
import type { Task } from "../types/task";
import Header from "@/components/header";

export default function TaskScreen() {
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>({} as Task); 

  const [search, setSearch] = useState("");

  return (
    <>
      <Header/>
    <div className="bg-gray-100 min-h-screen p-6 ">
      <h1 className="text-3xl font-extrabold mb-4 text-blue-700">
        Lista de Tarefas
      </h1>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 px-8">
        <Input
          placeholder="Buscar por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-md border border-gray-300 rounded-lg text-gray-700 bg-white"
        />

        <Button
          variant="default"
          className="rounded-full px-6 py-3 shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setIsNewTaskModalOpen(true)}
        >
          Adicionar nova tarefa
        </Button>
      </div>

      <TaskList userId={1} search={search} selectTask={setSelectedTask} setEditTaskModalOpen={setIsEditTaskModalOpen}/>

      <NewTaskModal isOpen={isNewTaskModalOpen} onClose={() => setIsNewTaskModalOpen(false)} />
      <EditTaskModal isOpen={isEditTaskModalOpen} onClose={() => setIsEditTaskModalOpen(false)} task={selectedTask}/>

    </div>
    </>
  );
}
