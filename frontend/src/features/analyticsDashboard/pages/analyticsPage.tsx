import TaskSummary from "../components/tasksSummary";
import { useFilteredTasks } from "@/features/taskDashboard/hooks/useTask";
import ChartByStatus from "../components/chartByStatus";
import ChartByCategory from "../components/chartByCategory";
import { useAuth } from "@/features/auth/context/authContext";
import { FallbackWrapper } from "@/shared/layout/fallbackWrapper";

export default function AnalyticsPage() {
  const { userId } = useAuth();
  const { data: tasks, isError, isLoading } = useFilteredTasks(userId);

  return (
    <FallbackWrapper isError={isError} isLoading={isLoading}>
      <div className="bg-gray-100 min-h-screen p-20 pt-36">
        <h1 className="text-4xl text-cyan-800 mb-6 text-center">
          Dashboard Analítico
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ChartByStatus tasks={tasks ?? []} />
          <ChartByCategory tasks={tasks ?? []} />
        </div>

        <TaskSummary tasks={tasks ?? []} />
      </div>
    </FallbackWrapper>
  );
}
