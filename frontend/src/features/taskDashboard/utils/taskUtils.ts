
export const translateCategory = (category: string) => {
  const map: Record<string, string> = {
    "Work": "Trabalho",
    "Study": "Estudos",
    "Personal": "Pessoal",
  };
  return map[category] || category;
};

export const translatePriority = (priority: string) => {
  const map: Record<string, string> = {
    "High": "Alta",
    "Medium": "Média",
    "Low": "Baixa",
  };
  return map[priority] || priority;
};

export const priorityColors: Record<string, string> = {
  High: "bg-red-100 text-red-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800",
};