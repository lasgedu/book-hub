import React, { createContext, useContext, useMemo, useState } from "react";
import { login as apiLogin } from "../services/api";

interface AuthContextValue {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = async (email: string, password: string) => {
    const response = await apiLogin(email, password);
    setToken(response.token);
    localStorage.setItem("token", response.token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      token,
      login,
      logout
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};