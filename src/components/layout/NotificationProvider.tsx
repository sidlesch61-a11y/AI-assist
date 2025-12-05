/** Global notification provider */

import React, { createContext, useContext, ReactNode } from "react";
import { useNotifications } from "../../hooks/useNotifications";
import { NotificationContainer } from "../design-system/NotificationContainer";

interface NotificationContextValue {
  showWarning: (message: string, title?: string) => string;
  showCritical: (message: string, title?: string) => string;
  showInfo: (message: string, title?: string) => string;
  showSuccess: (message: string, title?: string) => string;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
}

interface NotificationProviderProps {
  children: ReactNode;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
}

export function NotificationProvider({
  children,
  position = "top-right",
}: NotificationProviderProps) {
  const {
    notifications,
    removeNotification,
    clearAll,
    showWarning,
    showCritical,
    showInfo,
    showSuccess,
  } = useNotifications();

  return (
    <NotificationContext.Provider
      value={{
        showWarning,
        showCritical,
        showInfo,
        showSuccess,
        clearAll,
      }}
    >
      {children}
      <NotificationContainer
        notifications={notifications}
        onRemove={removeNotification}
        position={position}
      />
    </NotificationContext.Provider>
  );
}

