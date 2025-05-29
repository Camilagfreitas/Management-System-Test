import type { RouteObject } from "react-router-dom";
import TaskScreen from "./pages/taskPage";
import AnalyticsScreen from "../analyticsDashboard/pages/analyticsPage";

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <TaskScreen />,
  },
  {
    path: "/analises",
    element: <AnalyticsScreen />,
  },
];
