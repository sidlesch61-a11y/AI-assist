/** Empty chat state component - shown when no active consultations */

import React from "react";
import { Button } from "../common/Button";
import { CarIcon } from "../icons/AutomotiveIcons";

interface EmptyChatStateProps {
  onCreateSession?: () => void;
}

export function EmptyChatState({ onCreateSession }: EmptyChatStateProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="card-industrial max-w-md w-full text-center space-y-6 py-12 px-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-full flex items-center justify-center">
            <CarIcon size={40} className="text-primary-400" />
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-xl font-semibold text-industrial-200 mb-2">
            🚗 No active consultations
          </h3>
        </div>

        {/* Instructions */}
        <div className="space-y-3 text-left">
          <p className="text-sm text-industrial-400">
            Start a new diagnostic session by:
          </p>
          <ol className="space-y-2 text-sm text-industrial-300 list-decimal list-inside">
            <li className="pl-2">
              Selecting a vehicle from your workshop
            </li>
            <li className="pl-2">
              Entering error codes or symptoms
            </li>
            <li className="pl-2">
              Asking our AI assistant for guidance
            </li>
          </ol>
        </div>

        {/* CTA Button */}
        {onCreateSession && (
          <div className="pt-4">
            <Button
              onClick={onCreateSession}
              className="w-full flex items-center justify-center gap-2"
            >
              <CarIcon size={20} />
              <span>Start New Diagnosis</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

