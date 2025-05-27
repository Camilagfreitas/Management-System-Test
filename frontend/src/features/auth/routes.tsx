import type { RouteObject } from "react-router-dom";
import RegisterScreen from "./views/registerScreen";
import LoginScreen from "./views/loginScreen";

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