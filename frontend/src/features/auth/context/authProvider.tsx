import React, { useState } from "react";
import { AuthContext, type User } from "./authContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string>(() => {
    const storedUserId = localStorage.getItem("userId");
    return storedUserId ? JSON.parse(storedUserId) : null;
  });

  const [userName, setUserName] = useState<string>(() => {
    const storedUserName = localStorage.getItem("userName");
    return storedUserName ? JSON.parse(storedUserName) : null;
  });

  const handleSetUser = (newUser: User | null) => {
    if (newUser) {
      setUserId(newUser.id);
      setUserName(newUser.name);
      localStorage.setItem("userId", JSON.stringify(newUser.id));
      localStorage.setItem("userName", JSON.stringify(newUser.name));
      localStorage.setItem("token", newUser.token);
    } else {
      setUserId("");
      setUserName("");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("token");
    }
  };

  const handleRemoveUser = () => {
    setUserId("");
    setUserName("");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        userName,
        userId,
        setUser: handleSetUser,
        removeUser: handleRemoveUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
