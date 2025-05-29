import type { RouteObject } from "react-router-dom";
import RegisterScreen from "./pages/registerPage";
import LoginScreen from "./pages/loginPage";

export const authRoutes: RouteObject[] = [
  {
    path: "/",
    element: <LoginScreen />,
  },
  {
    path: "/register",
    element: <RegisterScreen />,
  },
];
