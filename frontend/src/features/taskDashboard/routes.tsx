import type { RouteObject } from "react-router-dom";
import TaskScreen from "./views/taskScreen";
import AnalyticsScreen from "../analyticsDashboard/views/analyticsScreen";


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