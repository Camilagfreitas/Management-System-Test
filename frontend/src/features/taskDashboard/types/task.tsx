export type Task = {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "InProgress" | "Completed";
};