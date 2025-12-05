/** WebSocket provider for real-time connections */

import React, { createContext, useContext } from "react";
import { useWebSocket } from "../hooks/useWebSocket";
import { useAuthStore } from "../stores/auth.store";

interface WebSocketContextValue {
  isConnected: boolean;
  connectionError: string | null;
  sendMessage: (content: string, attachments?: any[]) => void;
}

const WebSocketContext = createContext<WebSocketContextValue | null>(null);

interface WebSocketProviderProps {
  children: React.ReactNode;
  threadId: string | null;
  onMessage?: (message: any) => void;
}

export function WebSocketProvider({
  children,
  threadId,
  onMessage,
}: WebSocketProviderProps) {
  const { accessToken } = useAuthStore();
  const { isConnected, connectionError, sendMessage } = useWebSocket({
    threadId,
    onMessage,
    onError: () => {},
    onConnect: () => {},
    onDisconnect: () => {},
  });

  const value: WebSocketContextValue = {
    isConnected,
    connectionError,
    sendMessage,
  };

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
}

export function useWebSocketContext() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocketContext must be used within WebSocketProvider");
  }
  return context;
}

