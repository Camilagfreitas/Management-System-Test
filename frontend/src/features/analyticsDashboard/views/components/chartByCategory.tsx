import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Task } from "@/features/taskDashboard/types/task";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/card";

interface ChartByCategoryProps {
  tasks: Task[];
}

const COLORS = ["#4FC3F7", "#81C784", "#FFD54F"];

export default function ChartByCategory({ tasks }: ChartByCategoryProps) {
  const categoryCount = tasks.reduce(
    (acc: Record<string, number>, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    },
    { Personal: 0, Work: 0, Study: 0 }
  );

  const data = [
    { name: "Pessoal", value: categoryCount.Personal },
    { name: "Trabalho", value: categoryCount.Work },
    { name: "Estudos", value: categoryCount.Study },
  ];

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-cyan-500">Tarefas por Categoria</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={80}
              labelLine={false}
              label
            >
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
