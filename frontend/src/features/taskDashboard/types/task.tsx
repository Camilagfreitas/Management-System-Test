export type Task = {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: "Work" | "Personal" | "Study";
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "InProgress" | "Completed";
};
