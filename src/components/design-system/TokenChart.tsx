/** Compact sparkline chart for token usage */

import React from "react";

interface TokenChartProps {
  data: number[];
  height?: number;
  strokeWidth?: number;
  gradient?: [string, string];
  showPoints?: boolean;
  className?: string;
}

export function TokenChart({
  data,
  height = 40,
  strokeWidth = 2,
  gradient = ["#3B82F6", "#1E40AF"],
  showPoints = false,
  className = "",
}: TokenChartProps) {
  if (!data || data.length === 0) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ height: `${height}px` }}
      >
        <span className="text-xs text-industrial-500">No data</span>
      </div>
    );
  }

  // Calculate dimensions
  const width = 100; // Percentage-based width
  const padding = 2;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Normalize data to fit chart height
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const range = maxValue - minValue || 1; // Avoid division by zero

  // Generate path points
  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1 || 1)) * chartWidth;
    const y =
      padding +
      chartHeight -
      ((value - minValue) / range) * chartHeight;
    return { x, y, value };
  });

  // Create area path (closed path for gradient fill)
  const areaPath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  // Close the path at the bottom
  const closedAreaPath = `${areaPath} L ${points[points.length - 1].x} ${
    padding + chartHeight
  } L ${points[0].x} ${padding + chartHeight} Z`;

  // Create line path (for stroke)
  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  return (
    <div className={`relative ${className}`} style={{ height: `${height}px` }}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="overflow-visible"
      >
        <defs>
          {/* Gradient definition */}
          <linearGradient id="tokenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={gradient[0]} stopOpacity="0.3" />
            <stop offset="100%" stopColor={gradient[1]} stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <path
          d={closedAreaPath}
          fill="url(#tokenGradient)"
          className="transition-all duration-300"
        />

        {/* Line stroke */}
        <path
          d={linePath}
          fill="none"
          stroke={gradient[0]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300"
        />

        {/* Points (optional) */}
        {showPoints &&
          points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="2"
              fill={gradient[0]}
              className="transition-all duration-300"
            />
          ))}
      </svg>
    </div>
  );
}

