export type Task = {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  priority: "Alta" | "Média" | "Baixa";
  status: "Pending" | "InProgress" | "Completed";
};