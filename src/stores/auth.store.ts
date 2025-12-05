import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoginResponse } from "../types/api.types";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setTokens: (tokens: LoginResponse) => void;
  logout: () => void;
  refreshAccessToken: (newAccessToken: string) => void;
  loadTokensFromStorage: () => void;
}

const STORAGE_KEY = "auth-storage";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      setTokens: (tokens) =>
        set({
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token || null,
          isAuthenticated: !!tokens.access_token,
        }),
      refreshAccessToken: (newAccessToken) =>
        set({
          accessToken: newAccessToken,
          isAuthenticated: !!newAccessToken,
        }),
      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
      loadTokensFromStorage: () => {
        // This is handled automatically by persist middleware,
        // but we can manually trigger rehydration if needed
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            const state = parsed.state || parsed;
            set({
              accessToken: state.accessToken || null,
              refreshToken: state.refreshToken || null,
              isAuthenticated: !!state.accessToken,
            });
          } catch (e) {
            console.error("Failed to load tokens from storage", e);
          }
        }
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: !!state.accessToken, // Ensure isAuthenticated matches token presence
      }),
      onRehydrateStorage: () => (state) => {
        // When state is rehydrated from localStorage, ensure isAuthenticated matches token
        if (state) {
          state.isAuthenticated = !!state.accessToken;
        }
      },
    }
  )
);


