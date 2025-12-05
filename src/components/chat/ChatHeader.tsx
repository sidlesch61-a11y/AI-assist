/** Compact vehicle info bar with icons, status, and real-time duration */

import React, { useState, useEffect } from "react";
import { CarIcon, AlertIcon, CheckCircleIcon, ClockIcon } from "../icons/AutomotiveIcons";

interface ChatHeaderProps {
  licensePlate: string;
  make?: string;
  model?: string;
  year?: number;
  currentKm?: number;
  engineType?: string;
  errorCodes?: string;
  status?: "active" | "resolved" | "archived";
  threadId?: string;
  createdAt?: string;
  tokenUsage?: {
    user?: {
      daily_limit?: number | null;
      daily_used?: number;
      daily_remaining?: number | null;
      monthly_limit?: number | null;
      monthly_used?: number;
      monthly_remaining?: number | null;
      is_unlimited?: boolean;
    };
    workshop?: {
      monthly_limit?: number;
      monthly_used?: number;
      monthly_remaining?: number;
    };
  } | null;
  onAttach?: () => void;
  onTemplate?: () => void;
  onHistory?: () => void;
}

export function ChatHeader({
  licensePlate,
  make,
  model,
  year,
  currentKm,
  engineType,
  errorCodes,
  status = "active",
  threadId,
  createdAt,
  tokenUsage,
  onAttach,
  onTemplate,
  onHistory,
}: ChatHeaderProps) {
  const [elapsedTime, setElapsedTime] = useState<string>("0m");

  // Calculate real-time elapsed duration
  useEffect(() => {
    if (!createdAt) return;

    const updateElapsed = () => {
      const start = new Date(createdAt).getTime();
      const now = Date.now();
      const diff = now - start;
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(minutes / 60);
      
      if (hours > 0) {
        setElapsedTime(`${hours}h ${minutes % 60}m`);
      } else {
        setElapsedTime(`${minutes}m`);
      }
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [createdAt]);

  // Status color coding
  const getStatusColor = () => {
    switch (status) {
      case "active":
        return "text-warning-400";
      case "resolved":
        return "text-success-400";
      case "archived":
        return "text-industrial-400";
      default:
        return "text-industrial-400";
    }
  };

  const getStatusBg = () => {
    switch (status) {
      case "active":
        return "bg-warning-500/10 border-warning-500/30";
      case "resolved":
        return "bg-success-500/10 border-success-500/30";
      case "archived":
        return "bg-industrial-500/10 border-industrial-500/30";
      default:
        return "bg-industrial-500/10 border-industrial-500/30";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "active":
        return "IN PROGRESS";
      case "resolved":
        return "RESOLVED";
      case "archived":
        return "ARCHIVED";
      default:
        return "ACTIVE";
    }
  };

  return (
    <div className="glass-strong border-b border-industrial-800">
      {/* Compact Vehicle Info Bar */}
      <div className="px-4 py-2.5 font-mono text-xs">
        {/* First Row: Vehicle, Plate, KM */}
        <div className="flex items-center gap-3 text-sm font-medium text-industrial-200 flex-wrap">
          {/* Vehicle */}
          <div className="flex items-center gap-1.5">
            <CarIcon size={14} className="text-primary-400 flex-shrink-0" />
            <span className="text-industrial-100 whitespace-nowrap">
              <span className="text-industrial-400">VEHICLE:</span>{" "}
              {make && model ? `${make} ${model}` : "Unknown"}
              {year && ` ${year}`}
            </span>
          </div>
          
          <span className="text-industrial-600">|</span>
          
          {/* License Plate */}
          <div className="flex items-center gap-1.5">
            <span className="text-primary-400 text-base">🏷️</span>
            <span className="font-mono text-industrial-100 whitespace-nowrap">
              <span className="text-industrial-400">PLATE:</span> {licensePlate}
            </span>
          </div>
          
          {currentKm && (
            <>
              <span className="text-industrial-600">|</span>
              {/* KM */}
              <div className="flex items-center gap-1.5">
                <span className="text-primary-400 text-base">📏</span>
                <span className="text-industrial-100 whitespace-nowrap">
                  <span className="text-industrial-400">KM:</span> {currentKm.toLocaleString()}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Second Row: Engine, Status, Duration */}
        <div className="flex items-center gap-3 text-sm font-medium text-industrial-200 mt-1.5 flex-wrap">
          {/* Engine */}
          {engineType && (
            <>
              <div className="flex items-center gap-1.5">
                <span className="text-primary-400 text-base">⚙️</span>
                <span className="text-industrial-100 whitespace-nowrap">
                  <span className="text-industrial-400">ENGINE:</span> {engineType}
                </span>
              </div>
              <span className="text-industrial-600">|</span>
            </>
          )}
          
          {/* Status */}
          <div className="flex items-center gap-1.5">
            <span className="text-primary-400 text-base">🚦</span>
            <span className={`px-2 py-0.5 rounded border text-xs font-semibold whitespace-nowrap ${getStatusBg()} ${getStatusColor()}`}>
              STATUS: {getStatusText()}
            </span>
          </div>
          
          {/* Duration */}
          {createdAt && (
            <>
              <span className="text-industrial-600">|</span>
              <div className="flex items-center gap-1.5">
                <ClockIcon size={14} className="text-primary-400 flex-shrink-0" />
                <span className="text-industrial-100 whitespace-nowrap">
                  <span className="text-industrial-400">⏱️</span> {elapsedTime} elapsed
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Error Codes Bar (if present) */}
      {errorCodes && (
        <div className="px-4 py-2 bg-warning-500/10 border-t border-warning-500/30">
          <div className="flex items-center gap-2 text-sm">
            <AlertIcon size={16} className="text-warning-400" />
            <span className="text-warning-400 font-medium">DTC Codes:</span>
            <div className="flex flex-wrap gap-2">
              {errorCodes.split(",").map((code, idx) => (
                <span key={idx} className="font-mono text-warning-300 bg-warning-500/20 px-2 py-0.5 rounded">
                  {code.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

