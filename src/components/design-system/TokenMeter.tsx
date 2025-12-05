/** Interactive token usage meter with hover breakdown and clickable detailed report */

import React, { useState } from "react";

interface TokenMeterProps {
  used: number;
  limit: number;
  inputTokens?: number;
  outputTokens?: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
  onDetailedReport?: () => void;
}

export function TokenMeter({
  used,
  limit,
  inputTokens,
  outputTokens,
  label,
  showPercentage = true,
  className = "",
  onDetailedReport,
}: TokenMeterProps) {
  const [isHovered, setIsHovered] = useState(false);
  const percentage = limit > 0 ? Math.min(100, (used / limit) * 100) : 0;
  
  // Color logic: Green (0-70%) → Yellow (70-90%) → Red (90-100%)
  const getMeterColor = () => {
    if (percentage >= 90) return "token-meter-critical"; // Red
    if (percentage >= 70) return "token-meter-warning"; // Yellow
    return "token-meter-ok"; // Green
  };

  const getMeterColorClass = () => {
    if (percentage >= 90) return "bg-error-500";
    if (percentage >= 70) return "bg-warning-500";
    return "bg-success-500";
  };

  // Calculate input/output if not provided (rough estimate: 50/50 split)
  const input = inputTokens ?? Math.floor(used * 0.5);
  const output = outputTokens ?? Math.ceil(used * 0.5);

  const handleClick = () => {
    if (onDetailedReport) {
      onDetailedReport();
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex justify-between text-sm">
          <span className="text-industrial-400">{label}</span>
          {showPercentage && (
            <span className="text-industrial-300 font-medium">
              {Math.round(percentage)}% used ({used.toLocaleString()}/{limit.toLocaleString()})
            </span>
          )}
        </div>
      )}
      
      {/* Interactive Progress Bar */}
      <div
        className={`relative group ${onDetailedReport ? "cursor-pointer" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Progress Bar Container */}
        <div className={`token-meter relative overflow-hidden ${onDetailedReport ? "hover:ring-2 hover:ring-primary-500/30 transition-all" : ""}`}>
          {/* Filled portion with visual blocks */}
          <div
            className={`token-meter-fill ${getMeterColor()} transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          >
            {/* Visual pattern for filled portion */}
            <div className="h-full w-full opacity-20 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse-slow" />
          </div>
          
          {/* Empty portion (visual) */}
          <div
            className="absolute inset-0 bg-industrial-800"
            style={{ 
              left: `${percentage}%`,
              width: `${100 - percentage}%`,
            }}
          />
        </div>

        {/* Hover Tooltip - Breakdown */}
        {isHovered && (inputTokens !== undefined || outputTokens !== undefined) && (
          <div className="absolute bottom-full left-0 mb-2 z-50 animate-slide-up">
            <div className="card-industrial border border-primary-500/30 shadow-glow px-3 py-2.5 min-w-[220px]">
              <div className="text-xs font-semibold text-industrial-200 mb-2 flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${getMeterColorClass()}`} />
                Token Breakdown
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-industrial-400">Input:</span>
                  <span className="text-industrial-100 font-mono font-semibold">
                    {input.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-industrial-400">Output:</span>
                  <span className="text-industrial-100 font-mono font-semibold">
                    {output.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-industrial-700 pt-1.5 mt-1.5 flex justify-between items-center">
                  <span className="text-industrial-300 font-medium">Total:</span>
                  <span className="text-industrial-100 font-mono font-bold text-sm">
                    {used.toLocaleString()}
                  </span>
                </div>
              </div>
              {onDetailedReport && (
                <div className="text-xs text-primary-400 mt-2.5 pt-2 border-t border-industrial-700 flex items-center gap-1">
                  <span>Click for detailed report</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
            {/* Tooltip arrow */}
            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary-500/30" />
          </div>
        )}
      </div>

      {/* Percentage and Usage Display */}
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-2">
          <span className="text-industrial-500">
            {used.toLocaleString()} / {limit.toLocaleString()}
          </span>
          {showPercentage && (
            <span className={`font-semibold ${
              percentage >= 90 ? "text-error-400" :
              percentage >= 70 ? "text-warning-400" :
              "text-success-400"
            }`}>
              {Math.round(percentage)}% used
            </span>
          )}
        </div>
        <span className="text-industrial-500">
          {(limit - used).toLocaleString()} remaining
        </span>
      </div>
    </div>
  );
}

