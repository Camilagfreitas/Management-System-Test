import { useMutation } from "@tanstack/react-query";
import { login, register, type LoginData, type NewUser } from "../services/authService";

export function useCreateUser() {
  return useMutation({
    mutationFn: (newUser: NewUser) => register(newUser),
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginData) => login(data),
  });
}