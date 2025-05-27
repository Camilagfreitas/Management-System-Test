import type { Task } from "@/features/taskDashboard/types/task";
import { Card, CardTitle, CardContent } from "@/ui/components/card";

import { useGetTaskSummary } from "../../hooks/useAnalytics";
import { Badge } from "@/ui/components/badge";

interface TaskSummaryProps {
  tasks: Task[];
}

export default function TaskSummary({ tasks }: TaskSummaryProps) {
  const { completed, open } = useGetTaskSummary(tasks);

  return (
    <Card className="flex justify-around p-6 bg-white shadow-md rounded-lg">
      <CardContent className="flex flex-col items-center">
        <CardTitle className="text-blue-600">Tarefas Concluídas</CardTitle>
        <Badge
          variant="default"
          className="text-2xl font-bold px-6 py-3 text-blue-600"
        >
          {completed}
        </Badge>
      </CardContent>

      <CardContent className="flex flex-col items-center">
        <CardTitle className="text-gray-600">Tarefas Pendentes</CardTitle>
        <Badge
          variant="destructive"
          className="text-2xl font-bold px-6 py-3 text-gray-600"
        >
          {open}
        </Badge>
      </CardContent>
    </Card>
  );
}
