// import ChartByStatus from "./ChartByStatus";
// import ChartByCategory from "./ChartByCategory";
import Header from "@/components/header";
import TaskSummary from "./tasksSummary";
import { useUserTasks } from "@/features/taskDashboard/hooks/useTask";

export default function AnalyticsScreen() {
    const { data: tasks, isLoading } = useUserTasks('1');

  return (
    <>
    <Header/>
    <div className="bg-gray-100 min-h-screen p-6 ">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Dashboard Analítico</h1>
      
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ChartByStatus />
        <ChartByCategory />
      </div> */}

      <TaskSummary tasks = {tasks ?? []} />
    </div>
    </>
  );
}
