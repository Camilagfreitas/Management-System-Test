import { useRoutes } from "react-router-dom";
import NotFound from "./NotFound";
import { authRoutes } from "../features/auth/routes";
import { dashboardRoutes } from "@/features/taskDashboard/routes";
import AppLayout from "@/shared/layout/appLayout";

export default function AppRouter() {
  const routes = useRoutes([
    ...authRoutes,
    {
      path: "/",
      element: <AppLayout />,
      children: [...dashboardRoutes],
    },
    { path: "*", element: <NotFound /> },
  ]);

  return routes;
}
