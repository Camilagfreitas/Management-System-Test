import type { Task } from "@/features/taskDashboard/types/task";


interface TaskSummary {
  completed: number;
  open: number;
}

export function useGetTaskSummary(tasks: Task[]): TaskSummary {
    console.log(tasks)
  return tasks.reduce(
    (acc, task) => {
      if (task.status === "Completed") {
        acc.completed++;
      } else {
        acc.open++;
      }
      return acc;
    },
    { completed: 0, open: 0 }
  );
}