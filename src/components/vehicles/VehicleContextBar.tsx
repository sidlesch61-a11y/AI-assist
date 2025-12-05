/** Vehicle context bar component - displays vehicle info with status and token usage */

import React from "react";
import { CarIcon } from "../icons/AutomotiveIcons";
import { TokenMeter } from "../design-system/TokenMeter";

export interface VehicleContextBarProps {
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  status: "in-progress" | "completed" | "pending";
  tokenUsage?: {
    current: number;
    max: number;
  };
  className?: string;
}

const statusColors = {
  "in-progress": "border-l-warning-500",
  completed: "border-l-success-500",
  pending: "border-l-industrial-500",
};

const statusLabels = {
  "in-progress": "In Progress",
  completed: "Completed",
  pending: "Pending",
};

export const VehicleContextBar: React.FC<VehicleContextBarProps> = ({
  licensePlate,
  make,
  model,
  year,
  mileage,
  status,
  tokenUsage,
  className = "",
}) => {
  return (
    <div
      className={`card-workshop border-l-4 ${statusColors[status]} p-4 ${className}`}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left: Vehicle Info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Car Icon */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
              <CarIcon size={24} className="text-primary-400" />
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-industrial-100 text-lg mb-1 truncate">
              {make} {model} {year}
            </h3>
            <div className="flex items-center flex-wrap gap-3 text-sm text-industrial-400">
              <span className="flex items-center gap-1.5">
                <span>🏷️</span>
                <span className="font-mono">{licensePlate}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span>📏</span>
                <span>{mileage.toLocaleString()} km</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span>⚙️</span>
                <span className="capitalize">{statusLabels[status]}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Token Meter */}
        {tokenUsage && (
          <div className="flex-shrink-0 w-48 hidden md:block">
            <TokenMeter
              used={tokenUsage.current}
              limit={tokenUsage.max}
              showPercentage={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

