/** Loading spinner component with automotive styling */

import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

export function LoadingSpinner({
  size = "md",
  className = "",
  text,
}: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        className={`${sizeClasses[size]} border-2 border-industrial-700 border-t-primary-500 rounded-full animate-spin`}
      />
      {text && (
        <p className="text-sm text-industrial-400">{text}</p>
      )}
    </div>
  );
}

