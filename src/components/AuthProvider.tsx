import { apiInstance } from "@/utils/apiInstance";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  _id: string;
  email: string;
  token: string;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  user: User | null | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    } else {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const login = async (email: string, password: string) => {
  const user: User = await apiInstance.post("/users/login", {
    email,
    password,
  });

  apiInstance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  localStorage.setItem("user", JSON.stringify(user));
};
