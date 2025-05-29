import type { Task } from "../../types/task";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Task A",
    status: "Pending",
    userId: "1",
    description: "",
    category: "Work",
    priority: "High",
  },
  {
    id: "2",
    title: "Task B",
    status: "InProgress",
    userId: "1",
    description: "",
    category: "Work",
    priority: "High",
  },
  {
    id: "3",
    title: "Task C",
    status: "Completed",
    userId: "1",
    description: "",
    category: "Work",
    priority: "High",
  },
];
