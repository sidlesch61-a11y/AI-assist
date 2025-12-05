/** Activity timeline component for displaying today's workshop activities */

import React from "react";

export type ActivityStatus = "started" | "waiting" | "in-progress" | "completed" | "paused" | "cancelled";
export type ActivityType = "start" | "consultation" | "waiting" | "work" | "completed" | "test" | "other";

export interface ActivityItem {
  id: string;
  time: string; // Format: "HH:MM"
  status: ActivityStatus;
  type: ActivityType;
  title: string;
  description?: string;
  vehicle?: {
    license_plate: string;
    make?: string;
    model?: string;
    error_codes?: string[];
  };
  metadata?: Record<string, any>;
}

interface ActivityTimelineProps {
  activities: ActivityItem[];
  title?: string;
  className?: string;
}

// Status color mapping
const statusColors: Record<ActivityStatus, string> = {
  started: "bg-success-500",
  waiting: "bg-warning-500",
  "in-progress": "bg-primary-500",
  completed: "bg-success-500",
  paused: "bg-industrial-500",
  cancelled: "bg-error-500",
};

// Status display text
const statusLabels: Record<ActivityStatus, string> = {
  started: "Started",
  waiting: "Waiting",
  "in-progress": "In Progress",
  completed: "Completed",
  paused: "Paused",
  cancelled: "Cancelled",
};

// Activity type icons
const typeIcons: Record<ActivityType, string> = {
  start: "🟢",
  consultation: "📝",
  waiting: "🟡",
  work: "🔧",
  completed: "🟢",
  test: "✅",
  other: "⚙️",
};

export function ActivityTimeline({
  activities,
  title = "Today's Activity",
  className = "",
}: ActivityTimelineProps) {
  if (activities.length === 0) {
    return (
      <div className={`card-industrial ${className}`}>
        <h3 className="text-sm font-semibold text-industrial-200 mb-4">{title}</h3>
        <div className="text-center py-8">
          <p className="text-sm text-industrial-500">No activities today</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`card-industrial ${className}`}>
      {/* Header */}
      <h3 className="text-sm font-semibold text-industrial-200 mb-4">{title}</h3>

      {/* Timeline */}
      <div className="space-y-0">
        {activities.map((activity, index) => {
          const isLast = index === activities.length - 1;
          const statusColor = statusColors[activity.status];
          const statusLabel = statusLabels[activity.status];
          const typeIcon = typeIcons[activity.type];

          return (
            <div key={activity.id} className="relative flex gap-3 pb-4 last:pb-0">
              {/* Timeline Line */}
              {!isLast && (
                <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-industrial-700" />
              )}

              {/* Status Dot */}
              <div className="relative flex-shrink-0">
                <div
                  className={`w-6 h-6 rounded-full ${statusColor} border-2 border-industrial-800 flex items-center justify-center z-10`}
                >
                  <span className="text-xs">{typeIcon}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                {/* Time and Status */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-industrial-400">{activity.time}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    activity.status === "completed"
                      ? "bg-success-500/20 text-success-400"
                      : activity.status === "in-progress"
                      ? "bg-primary-500/20 text-primary-400"
                      : activity.status === "waiting"
                      ? "bg-warning-500/20 text-warning-400"
                      : activity.status === "started"
                      ? "bg-success-500/20 text-success-400"
                      : "bg-industrial-700 text-industrial-400"
                  }`}>
                    {statusLabel}
                  </span>
                </div>

                {/* Title */}
                <div className="text-sm font-medium text-industrial-200 mb-1">
                  {activity.title}
                </div>

                {/* Vehicle Info */}
                {activity.vehicle && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-industrial-400">
                      {activity.vehicle.make && activity.vehicle.model
                        ? `${activity.vehicle.make} ${activity.vehicle.model}`
                        : activity.vehicle.license_plate}
                    </span>
                    {activity.vehicle.license_plate && (
                      <span className="text-xs text-industrial-500">
                        ({activity.vehicle.license_plate})
                      </span>
                    )}
                    {activity.vehicle.error_codes && activity.vehicle.error_codes.length > 0 && (
                      <div className="flex items-center gap-1">
                        {activity.vehicle.error_codes.map((code, idx) => (
                          <span
                            key={idx}
                            className="dtc-badge text-xs"
                          >
                            {code}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Description */}
                {activity.description && (
                  <p className="text-xs text-industrial-400 mt-1">{activity.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

