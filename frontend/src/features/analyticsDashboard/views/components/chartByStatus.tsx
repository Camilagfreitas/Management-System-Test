import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Task } from "@/features/taskDashboard/types/task";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartByStatusProps {
  tasks: Task[];
}

const COLORS = ["#4ade80", "#facc15", "#f87171"];

export default function ChartByStatus({ tasks }: ChartByStatusProps) {
  const statusCount = tasks.reduce(
    (acc, task) => {
      if (task.status === "Completed") acc.Completed++;
      else if (task.status === "InProgress") acc.InProgress++;
      else acc.Pending++;
      return acc;
    },
    { Completed: 0, InProgress: 0, Pending: 0 }
  );

  const data = [
    { name: "Concluídas", value: statusCount.Completed },
    { name: "Em andamento", value: statusCount.InProgress },
    { name: "Pendentes", value: statusCount.Pending },
  ];

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-cyan-500">Tarefas por Status</CardTitle>
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
