/** Empty state component for when there's no data */

import React from "react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`card-industrial text-center py-12 ${className}`}>
      {icon && (
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-industrial-800 flex items-center justify-center">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-industrial-200 mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-industrial-400 mb-4 max-w-md mx-auto">
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="btn-primary"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

