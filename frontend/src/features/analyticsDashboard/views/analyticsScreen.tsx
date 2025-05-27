import Header from "@/shared/components/header";
import TaskSummary from "./components/tasksSummary";
import { useUserTasks } from "@/features/taskDashboard/hooks/useTask";
import ChartByStatus from "./components/chartByStatus";
import ChartByCategory from "./components/chartByCategory";

export default function AnalyticsScreen() {
  const { data: tasks, isLoading } = useUserTasks("1");

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen p-6 pt-22">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Dashboard Analítico
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ChartByStatus tasks={tasks ?? []} />
          <ChartByCategory tasks={tasks ?? []} />
        </div>

        <TaskSummary tasks={tasks ?? []} />
      </div>
    </>
  );
}
