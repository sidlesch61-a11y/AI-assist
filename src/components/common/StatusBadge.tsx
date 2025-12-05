/** Status badge component with automotive styling */

import React from "react";
import { CheckCircleIcon, ClockIcon, AlertIcon } from "../icons/AutomotiveIcons";

interface StatusBadgeProps {
  status: "active" | "pending" | "resolved" | "error";
  label?: string;
  className?: string;
}

const statusConfig = {
  active: {
    className: "status-active",
    icon: CheckCircleIcon,
    defaultLabel: "Active",
  },
  pending: {
    className: "status-pending",
    icon: ClockIcon,
    defaultLabel: "Pending",
  },
  resolved: {
    className: "status-resolved",
    icon: CheckCircleIcon,
    defaultLabel: "Resolved",
  },
  error: {
    className: "status-error",
    icon: AlertIcon,
    defaultLabel: "Error",
  },
};

export function StatusBadge({
  status,
  label,
  className = "",
}: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`${config.className} ${className}`}>
      <Icon size={14} />
      <span>{label || config.defaultLabel}</span>
    </span>
  );
}

