/** Token meter component for displaying token usage */

import React from "react";
import { ActivityIcon } from "../../../components/icons/AutomotiveIcons";

interface TokenMeterProps {
  used: number;
  limit: number;
  label?: string;
  showPercentage?: boolean;
}

export function TokenMeter({
  used,
  limit,
  label = "Tokens",
  showPercentage = true,
}: TokenMeterProps) {
  const percentage = limit > 0 ? (used / limit) * 100 : 0;
  const remaining = limit - used;

  // Determine status
  const status =
    percentage >= 90
      ? "critical"
      : percentage >= 75
      ? "warning"
      : "ok";

  return (
    <div className="card-industrial">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <ActivityIcon size={16} className="text-industrial-500" />
          <span className="text-xs font-medium text-industrial-400">{label}</span>
        </div>
        <span className="text-xs text-industrial-500">
          {used.toLocaleString()} / {limit.toLocaleString()}
        </span>
      </div>

      <div className="token-meter">
        <div
          className={`token-meter-fill ${
            status === "critical"
              ? "token-meter-critical"
              : status === "warning"
              ? "token-meter-low"
              : "token-meter-ok"
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      <div className="flex items-center justify-between mt-2 text-xs">
        <span className="text-industrial-500">
          {remaining.toLocaleString()} remaining
        </span>
        {showPercentage && (
          <span
            className={
              status === "critical"
                ? "text-error-400"
                : status === "warning"
                ? "text-warning-400"
                : "text-success-400"
            }
          >
            {percentage.toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
}

