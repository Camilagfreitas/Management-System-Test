import { useUserTasks } from "../hooks/useTask";
import type { Task } from "../types/task";
import TaskCard from "./taskCard";

interface TaskListProps {
  userId: string | number;
  search?: string;
  selectTask?: (task: Task) => void;
  setEditTaskModalOpen?: (open: boolean) => void;
}

export default function TaskList({
  userId,
  search,
  selectTask,
  setEditTaskModalOpen,
}: TaskListProps) {
  const { data: tasks, isLoading, error } = useUserTasks(userId);

  if (isLoading)
    return <p className="text-center mt-10">Carregando tarefas...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Erro ao carregar tarefas.
      </p>
    );

  const filteredTasks = tasks?.filter((task) =>
    task.title.toLowerCase().includes((search ?? "").toLowerCase())
  );

  const groupedTasks = {
    pending: filteredTasks?.filter((t) => t.status === "Pending") || [],
    inProgress: filteredTasks?.filter((t) => t.status === "InProgress") || [],
    completed: filteredTasks?.filter((t) => t.status === "Completed") || [],
  };

  const statusLabels: Record<keyof typeof groupedTasks, string> = {
    pending: "Pendentes",
    inProgress: "Em Progresso",
    completed: "Concluídas",
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {Object.entries(groupedTasks).map(([status, taskList]) => (
        <div key={status}>
          <h2 className="text-xl font-bold text-blue-700 mb-4">
            {statusLabels[status as keyof typeof groupedTasks]}
          </h2>
          {taskList.length === 0 ? (
            <p className="text-gray-500">Nenhuma tarefa {statusLabels[status as keyof typeof groupedTasks].toLowerCase()}.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {taskList.map((task: Task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  selectTask={selectTask}
                  setEditTaskModalOpen={setEditTaskModalOpen}
                />
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
