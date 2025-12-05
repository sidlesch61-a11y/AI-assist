/** Auth provider for authentication context - updated for multi-tenant */

import React, { createContext, useContext, useEffect } from "react";
import { useAuthStore } from "../stores/auth.store";
import { useWorkshopStore } from "../stores/workshop.store";

interface AuthContextValue {
  isAuthenticated: boolean;
  user: { email: string | null } | null;
  login: (tokens: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { accessToken, isAuthenticated, setTokens, logout: logoutStore } = useAuthStore();
  const { setCurrentWorkshop } = useWorkshopStore();

  useEffect(() => {
    // Load tokens from storage on mount
    useAuthStore.getState().loadTokensFromStorage();
  }, []);

  const login = (tokens: any) => {
    setTokens(tokens);
  };

  const logout = () => {
    logoutStore();
    // Clear workshop selection on logout
    setCurrentWorkshop(null);
  };

  const value: AuthContextValue = {
    isAuthenticated: !!accessToken && isAuthenticated,
    user: accessToken ? { email: null } : null, // TODO: Decode JWT to get user info
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

