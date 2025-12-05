import React from "react";
import { WorkshopDashboard } from "./WorkshopDashboard";
import { AutomotiveLayout } from "../../components/layout/AutomotiveLayout";

export function AdminPage() {
  return (
    <AutomotiveLayout showRightPanel={false}>
      <WorkshopDashboard />
    </AutomotiveLayout>
  );
}


