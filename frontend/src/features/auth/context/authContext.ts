import { createContext, useContext } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type AuthContextType = {
  userId: string;
  userName: string;
  setUser: (user: User | null) => void;
  removeUser: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
