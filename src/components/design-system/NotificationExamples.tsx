/** Example usage of Notification component */

import React from "react";
import { Notification } from "./Notification";

export function NotificationExamples() {
  return (
    <div className="space-y-4 p-6">
      <h2 className="text-xl font-semibold text-industrial-200 mb-4">
        Notification Examples
      </h2>

      {/* Token Alert (Warning) */}
      <Notification
        type="warning"
        message="Token usage at 85% - Consider upgrading plan"
      />

      {/* Workshop Alert (Critical) */}
      <Notification
        type="critical"
        message="Multiple P0300 codes across vehicles - Check fuel batch"
      />

      {/* System Message (Info) */}
      <Notification
        type="info"
        message="AI model updated to GPT-4 - Improved diagnostics"
      />

      {/* Success Message */}
      <Notification
        type="success"
        message="Consultation saved to history - Download PDF available"
      />
    </div>
  );
}

