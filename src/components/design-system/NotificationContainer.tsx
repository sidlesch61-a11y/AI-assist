/** Notification container for displaying multiple notifications */

import React, { useState, useEffect } from "react";
import { Notification, type NotificationType } from "./Notification";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title?: string;
  message: string;
  autoClose?: boolean;
  duration?: number;
}

interface NotificationContainerProps {
  notifications: NotificationItem[];
  onRemove: (id: string) => void;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
  className?: string;
}

const positionClasses = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

export function NotificationContainer({
  notifications,
  onRemove,
  position = "top-right",
  className = "",
}: NotificationContainerProps) {
  if (notifications.length === 0) {
    return null;
  }

  return (
    <div
      className={`fixed ${positionClasses[position]} z-50 space-y-3 max-w-md w-full px-4 ${className}`}
    >
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          onClose={() => onRemove(notification.id)}
          autoClose={notification.autoClose}
          duration={notification.duration}
        />
      ))}
    </div>
  );
}

