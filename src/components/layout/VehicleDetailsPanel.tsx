/** Expandable vehicle details panel at bottom of screen */

import React, { useState } from "react";
import { VehicleDetailsPanel as VehicleDetails } from "../vehicle/VehicleDetailsPanel";

interface ExpandableVehicleDetailsPanelProps {
  vehicleId?: string;
  vehicleData?: {
    license_plate?: string;
    make?: string;
    model?: string;
    year?: number;
    current_km?: number;
    error_codes?: string[];
  };
}

export function ExpandableVehicleDetailsPanel({
  vehicleId,
  vehicleData,
}: ExpandableVehicleDetailsPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!vehicleId && !vehicleData) {
    return null;
  }

  return (
    <div
      className={`bg-[#111827] border-t border-industrial-800 transition-all duration-300 ${
        isExpanded ? "h-96" : "h-12"
      } flex flex-col`}
    >
      {/* Header - Always visible */}
      <div
        className="flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-industrial-800/30 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">🚗</span>
          <div>
            <h3 className="text-sm font-semibold text-industrial-200">
              Vehicle Details
            </h3>
            {vehicleData?.license_plate && (
              <p className="text-xs text-industrial-400">
                {vehicleData.license_plate}
                {vehicleData.make && vehicleData.model
                  ? ` • ${vehicleData.make} ${vehicleData.model}`
                  : ""}
              </p>
            )}
          </div>
        </div>
        <button
          className="p-1 hover:bg-industrial-700 rounded transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          aria-label={isExpanded ? "Collapse panel" : "Expand panel"}
        >
          <svg
            className={`w-5 h-5 text-industrial-400 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Content - Only visible when expanded */}
      {isExpanded && (
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          {vehicleId ? (
            <VehicleDetails vehicleId={vehicleId} />
          ) : vehicleData ? (
            <div className="space-y-4">
              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                {vehicleData.license_plate && (
                  <div className="card-industrial">
                    <div className="text-xs text-industrial-400 mb-1">License Plate</div>
                    <div className="text-sm font-semibold text-industrial-200">
                      {vehicleData.license_plate}
                    </div>
                  </div>
                )}
                {vehicleData.current_km && (
                  <div className="card-industrial">
                    <div className="text-xs text-industrial-400 mb-1">Current KM</div>
                    <div className="text-sm font-semibold text-industrial-200">
                      {vehicleData.current_km.toLocaleString()} km
                    </div>
                  </div>
                )}
                {vehicleData.make && (
                  <div className="card-industrial">
                    <div className="text-xs text-industrial-400 mb-1">Make</div>
                    <div className="text-sm font-semibold text-industrial-200">
                      {vehicleData.make}
                    </div>
                  </div>
                )}
                {vehicleData.model && (
                  <div className="card-industrial">
                    <div className="text-xs text-industrial-400 mb-1">Model</div>
                    <div className="text-sm font-semibold text-industrial-200">
                      {vehicleData.model}
                    </div>
                  </div>
                )}
              </div>

              {/* Error Codes */}
              {vehicleData.error_codes && vehicleData.error_codes.length > 0 && (
                <div className="card-industrial">
                  <div className="text-xs text-industrial-400 mb-2">Error Codes</div>
                  <div className="flex flex-wrap gap-2">
                    {vehicleData.error_codes.map((code, idx) => (
                      <span
                        key={idx}
                        className="dtc-badge"
                      >
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

