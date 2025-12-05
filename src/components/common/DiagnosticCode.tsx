/** Diagnostic code display component with automotive styling */

import React from "react";

interface DiagnosticCodeProps {
  code: string;
  variant?: "default" | "error" | "critical";
  className?: string;
}

export function DiagnosticCode({
  code,
  variant = "default",
  className = "",
}: DiagnosticCodeProps) {
  return (
    <span
      className={`dtc-badge ${
        variant === "error" || variant === "critical" ? "critical" : ""
      } ${className}`}
    >
      {code}
    </span>
  );
}

