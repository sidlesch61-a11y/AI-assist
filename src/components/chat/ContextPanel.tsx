/** Context panel with vehicle details, session highlights, error codes, suggestions */

import React from "react";
import { CarIcon, SpeedometerIcon, AlertIcon, WrenchIcon } from "../icons/AutomotiveIcons";
import { DiagnosticCode } from "../common/DiagnosticCode";
import { VehicleDetailsPanel } from "../vehicle/VehicleDetailsPanel";

interface ContextPanelProps {
  vehicleId?: string;
  vehicleData?: {
    license_plate: string;
    make?: string;
    model?: string;
    year?: number;
    current_km?: number;
    engine_type?: string;
    fuel_type?: string;
  };
  errorCodes?: string[];
  sessionHighlights?: string[];
  suggestedQuestions?: string[];
  onSuggestedQuestionClick?: (question: string) => void;
}

const ERROR_CODE_EXPLANATIONS: Record<string, string> = {
  P0301: "Cylinder 1 Misfire Detected",
  P0302: "Cylinder 2 Misfire Detected",
  P0303: "Cylinder 3 Misfire Detected",
  P0304: "Cylinder 4 Misfire Detected",
  P0420: "Catalyst System Efficiency Below Threshold",
  P0171: "System Too Lean (Bank 1)",
  P0172: "System Too Rich (Bank 1)",
  P0401: "Exhaust Gas Recirculation Flow Insufficient",
  P0442: "Evaporative Emission Control System Leak Detected (Small)",
  P0455: "Evaporative Emission Control System Leak Detected (Large)",
};

export function ContextPanel({
  vehicleId,
  vehicleData,
  errorCodes = [],
  sessionHighlights = [],
  suggestedQuestions = [],
  onSuggestedQuestionClick,
}: ContextPanelProps) {
  return (
    <div className="space-y-4">
      {/* Vehicle Details Summary */}
      {vehicleData && (
        <div className="card-industrial">
          <div className="flex items-center gap-2 mb-3">
            <CarIcon size={18} className="text-primary-400" />
            <h3 className="font-semibold text-industrial-200 text-sm">
              Vehicle Summary
            </h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-industrial-400">License:</span>
              <span className="text-industrial-200 font-semibold">
                {vehicleData.license_plate}
              </span>
            </div>
            {vehicleData.make && vehicleData.model && (
              <div className="flex justify-between">
                <span className="text-industrial-400">Make/Model:</span>
                <span className="text-industrial-200">
                  {vehicleData.make} {vehicleData.model}
                </span>
              </div>
            )}
            {vehicleData.current_km && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <SpeedometerIcon size={14} className="text-industrial-500" />
                  <span className="text-industrial-400">Current KM:</span>
                </div>
                <span className="text-industrial-200 font-semibold">
                  {vehicleData.current_km.toLocaleString()} km
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error Code Explanations */}
      {errorCodes.length > 0 && (
        <div className="card-industrial">
          <div className="flex items-center gap-2 mb-3">
            <AlertIcon size={18} className="text-warning-400" />
            <h3 className="font-semibold text-industrial-200 text-sm">
              Error Codes
            </h3>
          </div>
          <div className="space-y-2">
            {errorCodes.map((code) => (
              <div key={code} className="space-y-1">
                <DiagnosticCode code={code} variant="error" />
                {ERROR_CODE_EXPLANATIONS[code] && (
                  <p className="text-xs text-industrial-400 pl-2">
                    {ERROR_CODE_EXPLANATIONS[code]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Previous Session Highlights */}
      {sessionHighlights.length > 0 && (
        <div className="card-industrial">
          <div className="flex items-center gap-2 mb-3">
            <WrenchIcon size={18} className="text-primary-400" />
            <h3 className="font-semibold text-industrial-200 text-sm">
              Session Highlights
            </h3>
          </div>
          <ul className="space-y-2 text-sm">
            {sessionHighlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary-400 mt-1">•</span>
                <span className="text-industrial-300">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggested Next Questions */}
      {suggestedQuestions.length > 0 && (
        <div className="card-industrial">
          <h3 className="font-semibold text-industrial-200 text-sm mb-3">
            Suggested Questions
          </h3>
          <div className="space-y-2">
            {suggestedQuestions.map((question, idx) => (
              <button
                key={idx}
                onClick={() => onSuggestedQuestionClick?.(question)}
                className="w-full text-left px-3 py-2 glass-light rounded-lg hover:bg-industrial-800 transition-colors text-sm text-industrial-300 hover:text-industrial-100"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Full Vehicle Details (if vehicleId provided) */}
      {vehicleId && (
        <div>
          <VehicleDetailsPanel vehicleId={vehicleId} />
        </div>
      )}
    </div>
  );
}

