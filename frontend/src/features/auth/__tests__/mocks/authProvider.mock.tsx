import { type ReactNode, useState } from "react";
import { AuthContext, type User } from "@/features/auth/context/authContext";

export const MockAuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string>("1");
  const [userName, setUserName] = useState<string>("Teste");

  const setUser = (newUser: User | null) => {
    if (newUser) {
      setUserId(newUser.id);
      setUserName(newUser.name);
    } else {
      setUserId("");
      setUserName("");
    }
  };

  return (
    <AuthContext.Provider value={{ userId, userName, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
