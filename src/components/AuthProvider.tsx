import { apiInstance } from "@/services";
import { get } from "http";
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

  const getCurrentUser = () => {
    const user = apiInstance
      .get("/blog/auth/me", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          const userData: User = res.data;
          setUser(userData);
        } else {
          setUser(null);
        }
      })
      .catch((err) => {
        setUser(null);
      });
  };

  useEffect(() => {
    getCurrentUser();
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
  const user: User = await apiInstance.post("/blog/auth/users/login", {
    email,
    password,
  });

  apiInstance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  localStorage.setItem("user", JSON.stringify(user));
};
