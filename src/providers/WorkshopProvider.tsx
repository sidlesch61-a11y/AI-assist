/** Workshop provider for multi-tenant context */

import React, { createContext, useContext, useEffect } from "react";
import { useWorkshopStore } from "../stores/workshop.store";
import { useAuthStore } from "../stores/auth.store";
import { fetchWorkshops } from "../api/workshops";
import { useWorkshopTheme } from "../hooks/useWorkshopTheme";

interface WorkshopContextValue {
  currentWorkshop: ReturnType<typeof useWorkshopStore>["currentWorkshop"];
  workshops: ReturnType<typeof useWorkshopStore>["workshops"];
  setCurrentWorkshop: ReturnType<typeof useWorkshopStore>["setCurrentWorkshop"];
  isLoading: boolean;
  error: string | null;
  refreshWorkshops: () => Promise<void>;
}

const WorkshopContext = createContext<WorkshopContextValue | null>(null);

interface WorkshopProviderProps {
  children: React.ReactNode;
}

export function WorkshopProvider({ children }: WorkshopProviderProps) {
  const { currentWorkshop, workshops, setCurrentWorkshop, setWorkshops } = useWorkshopStore();
  const { isAuthenticated, accessToken } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  // Apply workshop theme (primary color)
  useWorkshopTheme(currentWorkshop);

  const refreshWorkshops = async () => {
    // Only fetch if authenticated
    if (!isAuthenticated || !accessToken) {
      setError("Not authenticated");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchWorkshops();
      setWorkshops(response.workshops);
      
      // Auto-select first workshop if none selected
      if (!currentWorkshop && response.workshops.length > 0) {
        setCurrentWorkshop(response.workshops[0]);
      }
    } catch (err: any) {
      console.error("Failed to load workshops:", err);
      setError(err.response?.data?.detail || "Failed to load workshops");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch workshops when authenticated
    if (isAuthenticated && accessToken) {
      refreshWorkshops();
    } else {
      // Clear workshops when not authenticated
      setWorkshops([]);
      setCurrentWorkshop(null);
    }
  }, [isAuthenticated, accessToken]);

  const value: WorkshopContextValue = {
    currentWorkshop,
    workshops,
    setCurrentWorkshop,
    isLoading,
    error,
    refreshWorkshops,
  };

  return <WorkshopContext.Provider value={value}>{children}</WorkshopContext.Provider>;
}

export function useWorkshop() {
  const context = useContext(WorkshopContext);
  if (!context) {
    throw new Error("useWorkshop must be used within WorkshopProvider");
  }
  return context;
}

