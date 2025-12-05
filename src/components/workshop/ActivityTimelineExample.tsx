/** Example usage of ActivityTimeline component */

import React from "react";
import { ActivityTimeline, type ActivityItem } from "../design-system/ActivityTimeline";

export function ActivityTimelineExample() {
  // Example activities matching the user's design
  const activities: ActivityItem[] = [
    {
      id: "1",
      time: "08:30",
      status: "started",
      type: "start",
      title: "Started",
      vehicle: {
        license_plate: "ABC-123",
        make: "BMW",
        model: "X5",
        error_codes: ["P0420"],
      },
    },
    {
      id: "2",
      time: "09:15",
      status: "completed",
      type: "consultation",
      title: "AI Consultation",
      description: "Catalyst efficiency",
      vehicle: {
        license_plate: "ABC-123",
        make: "BMW",
        model: "X5",
        error_codes: ["P0420"],
      },
    },
    {
      id: "3",
      time: "10:00",
      status: "waiting",
      type: "waiting",
      title: "Waiting",
      description: "Parts delivery",
      vehicle: {
        license_plate: "ABC-123",
        make: "BMW",
        model: "X5",
      },
    },
    {
      id: "4",
      time: "11:30",
      status: "in-progress",
      type: "work",
      title: "In Progress",
      description: "O2 sensor replacement",
      vehicle: {
        license_plate: "ABC-123",
        make: "BMW",
        model: "X5",
      },
    },
    {
      id: "5",
      time: "12:45",
      status: "completed",
      type: "completed",
      title: "Completed",
      description: "Test drive passed",
      vehicle: {
        license_plate: "ABC-123",
        make: "BMW",
        model: "X5",
      },
    },
  ];

  return <ActivityTimeline activities={activities} />;
}

