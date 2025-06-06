export const translateCategoryAndPriority = (value: string) => {
  const map: Record<string, string> = {
    Category: "Categoria",
    Work: "Trabalho",
    Study: "Estudos",
    Personal: "Pessoal",
    Priority: "Prioridade",
    High: "Alta",
    Medium: "Média",
    Low: "Baixa",
  };
  return map[value] || value;
};

export const priorityColors: Record<string, string> = {
  High: "bg-red-100 text-red-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800",
};

export const filterGroups = [
  {
    group: "Category",
    options: [
      { value: "Work", label: "Work" },
      { value: "Personal", label: "Personal" },
      { value: "Study", label: "Study" },
    ],
  },
  {
    group: "Priority",
    options: [
      { value: "High", label: "High" },
      { value: "Medium", label: "Medium" },
      { value: "Low", label: "Low" },
    ],
  },
];
