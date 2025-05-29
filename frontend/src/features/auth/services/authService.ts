import api from "@/lib/api";
import API_ROUTES from "@/services/apiRoutes";
import type { User } from "../context/authContext";

export type NewUser = {
  name: string;
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export const register = async (newUser: NewUser) => {
  const response = await api.post(API_ROUTES.CREATE_USER, newUser);
  return response.data;
};

export const login = async (data: LoginData) => {
  const response = await api.post(API_ROUTES.LOGIN, data);
  return response.data as User;
};
