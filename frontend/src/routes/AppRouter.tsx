
import { useRoutes } from "react-router-dom";
import NotFound from "./NotFound";
import { authRoutes } from "../features/auth/routes";
import { dashboardRoutes } from "@/features/taskDashboard/routes";

export default function AppRouter() {
  const routes = useRoutes([
    ...authRoutes,
    ...dashboardRoutes,
    { path: "*", element: <NotFound /> },
  ]);

  return routes;
}
