/** Vehicle card component with automotive styling */

import React from "react";
import { CarIcon, AlertIcon } from "../icons/AutomotiveIcons";
import { DiagnosticCode } from "../common/DiagnosticCode";

interface VehicleCardProps {
  licensePlate: string;
  make?: string;
  model?: string;
  year?: string | number;
  mileage?: string | number;
  lastService?: string;
  issues?: string[];
  status?: "in-progress" | "resolved" | "critical" | "active";
  onClick?: () => void;
  className?: string;
}

export function VehicleCard({
  licensePlate,
  make,
  model,
  year,
  mileage,
  lastService,
  issues = [],
  status = "active",
  onClick,
  className = "",
}: VehicleCardProps) {
  // Status color coding: green (resolved/active), orange (in-progress), red (critical)
  const getStatusColor = () => {
    switch (status) {
      case "resolved":
      case "active":
        return "bg-success-400";
      case "in-progress":
        return "bg-warning-400";
      case "critical":
        return "bg-error-400";
      default:
        return "bg-industrial-400";
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case "resolved":
        return "Resolved";
      case "in-progress":
        return "In Progress";
      case "critical":
        return "Critical";
      case "active":
        return "Active";
      default:
        return "Active";
    }
  };

  // Format mileage
  const formatMileage = (m: string | number | undefined) => {
    if (!m) return null;
    if (typeof m === "string") {
      // Remove commas and format
      const num = parseInt(m.replace(/,/g, ""));
      return isNaN(num) ? m : num.toLocaleString();
    }
    return m.toLocaleString();
  };

  // Format last service date
  const formatLastService = (date: string | undefined) => {
    if (!date) return null;
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return date;
    }
  };

  return (
    <div
      className={`card-hover ${onClick ? "cursor-pointer" : ""} ${className}`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <CarIcon size={20} className="text-primary-400" />
            <h3 className="text-lg font-semibold text-industrial-200">
              {make && model ? `${make} ${model}` : "Vehicle"}
              {year && ` ${year}`}
            </h3>
          </div>
          <p className="font-mono text-sm text-industrial-400">
            {licensePlate}
          </p>
        </div>
        
        {/* Status Dot */}
        <div className="flex items-center gap-1.5">
          <div
            className={`w-2.5 h-2.5 rounded-full ${getStatusColor()} animate-pulse-slow`}
            title={getStatusLabel()}
          />
        </div>
      </div>

      {/* Vehicle Details */}
      <div className="space-y-2.5 text-sm">
        {/* Mileage */}
        {mileage && (
          <div className="flex justify-between items-center">
            <span className="text-industrial-400">Mileage</span>
            <span className="text-industrial-200 font-mono font-semibold">
              {formatMileage(mileage)} km
            </span>
          </div>
        )}

        {/* Last Service */}
        {lastService && (
          <div className="flex justify-between items-center">
            <span className="text-industrial-400">Last Service</span>
            <span className="text-industrial-200 text-xs">
              {formatLastService(lastService)}
            </span>
          </div>
        )}

        {/* Issues */}
        {issues.length > 0 && (
          <div className="pt-2 border-t border-industrial-700">
            <div className="flex items-center gap-1.5 mb-2">
              <AlertIcon size={14} className="text-warning-400" />
              <span className="text-xs font-medium text-industrial-400">
                Issues ({issues.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {issues.map((issue, idx) => {
                // Check if it's a DTC code (P####, B####, C####, U####)
                const isDTC = /^[PBCU]\d{4}$/i.test(issue.trim());
                return isDTC ? (
                  <DiagnosticCode
                    key={idx}
                    code={issue.trim().toUpperCase()}
                    variant="error"
                  />
                ) : (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-xs font-medium bg-warning-500/10 text-warning-400 border border-warning-500/30"
                  >
                    {issue}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

