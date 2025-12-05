import { useAuthStore } from "../stores/auth.store";

export function useAuth() {
  const { accessToken, isAuthenticated, setTokens, logout } = useAuthStore();
  return { accessToken, isAuthenticated, setTokens, logout };
}


