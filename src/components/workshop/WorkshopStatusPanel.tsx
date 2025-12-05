/** Workshop Status Panel - Compact overview of workshop metrics */

import React, { useEffect, useState } from "react";
import { useWorkshopStore } from "../../stores/workshop.store";
import { getRemainingTokens } from "../../api/tokens";
import { fetchChatThreads } from "../../api/chat";
import { fetchVehicles } from "../../api/vehicles";
import { getWorkshopMembers } from "../../api/workshops";

interface WorkshopStatusPanelProps {
  className?: string;
}

interface WorkshopStats {
  activeTechnicians: number;
  totalTechnicians: number;
  vehiclesToday: number;
  aiConsultations: number;
  tokensRemaining: number;
}

export function WorkshopStatusPanel({ className = "" }: WorkshopStatusPanelProps) {
  const { currentWorkshop } = useWorkshopStore();
  const [stats, setStats] = useState<WorkshopStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentWorkshop) {
      loadStats();
      // Refresh every 30 seconds
      const interval = setInterval(loadStats, 30000);
      return () => clearInterval(interval);
    } else {
      setStats(null);
      setLoading(false);
    }
  }, [currentWorkshop?.id]);

  const loadStats = async () => {
    if (!currentWorkshop) return;

    setLoading(true);
    try {
      // Load all stats in parallel
      const [tokenData, threads, vehicles, members] = await Promise.all([
        getRemainingTokens(currentWorkshop.id).catch(() => null),
        fetchChatThreads({ workshop_id: currentWorkshop.id }).catch(() => ({ threads: [] })),
        fetchVehicles({ workshop_id: currentWorkshop.id }).catch(() => ({ vehicles: [] })),
        getWorkshopMembers(currentWorkshop.id).catch(() => ({ members: [] })),
      ]);

      // Calculate vehicles today (created today)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const vehiclesToday = vehicles.vehicles?.filter((v: any) => {
        const createdDate = new Date(v.created_at);
        createdDate.setHours(0, 0, 0, 0);
        return createdDate.getTime() === today.getTime();
      }).length || 0;

      // Calculate AI consultations today (threads created today)
      const consultationsToday = threads.threads?.filter((t: any) => {
        const createdDate = new Date(t.created_at);
        createdDate.setHours(0, 0, 0, 0);
        return createdDate.getTime() === today.getTime();
      }).length || 0;

      // Count active technicians
      const technicians = members.members?.filter(
        (m: any) => m.role === "technician"
      ) || [];
      const activeTechnicians = technicians.filter((m: any) => m.is_active).length;
      const totalTechnicians = technicians.length;

      // Get tokens remaining
      const tokensRemaining = tokenData?.remaining?.workshop?.monthly_remaining || 0;

      setStats({
        activeTechnicians: technicians.length,
        totalTechnicians: totalTechnicians,
        vehiclesToday,
        aiConsultations: consultationsToday,
        tokensRemaining,
      });
    } catch (err) {
      console.error("Failed to load workshop stats:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!currentWorkshop) {
    return (
      <div className={`card-industrial ${className}`}>
        <div className="text-sm text-industrial-400 text-center py-4">
          No workshop selected
        </div>
      </div>
    );
  }

  if (loading && !stats) {
    return (
      <div className={`card-industrial animate-pulse ${className}`}>
        <div className="h-4 bg-industrial-700 rounded w-3/4 mb-4" />
        <div className="space-y-2">
          <div className="h-3 bg-industrial-700 rounded w-1/2" />
          <div className="h-3 bg-industrial-700 rounded w-1/2" />
          <div className="h-3 bg-industrial-700 rounded w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className={`card-industrial ${className}`}>
      {/* Workshop Name */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-industrial-700">
        <span className="text-lg">🏢</span>
        <h3 className="text-base font-semibold text-industrial-200">
          WORKSHOP: {currentWorkshop.name.toUpperCase()}
        </h3>
      </div>

      {/* Stats Grid */}
      <div className="space-y-3">
        {/* Active Technicians */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">👷</span>
            <span className="text-sm text-industrial-400">ACTIVE TECHNICIANS:</span>
          </div>
          <span className="text-sm font-semibold text-industrial-200 font-mono">
            {stats?.activeTechnicians || 0}/{stats?.totalTechnicians || 0}
          </span>
        </div>

        {/* Vehicles Today */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">🚗</span>
            <span className="text-sm text-industrial-400">VEHICLES TODAY:</span>
          </div>
          <span className="text-sm font-semibold text-industrial-200 font-mono">
            {stats?.vehiclesToday || 0}
          </span>
        </div>

        {/* AI Consultations */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">⚡</span>
            <span className="text-sm text-industrial-400">AI CONSULTATIONS:</span>
          </div>
          <span className="text-sm font-semibold text-industrial-200 font-mono">
            {stats?.aiConsultations || 0}
          </span>
        </div>

        {/* Tokens Remaining */}
        <div className="flex items-center justify-between pt-2 border-t border-industrial-700">
          <div className="flex items-center gap-2">
            <span className="text-base">💰</span>
            <span className="text-sm text-industrial-400">TOKENS REMAINING:</span>
          </div>
          <span className="text-sm font-semibold text-primary-400 font-mono">
            {stats?.tokensRemaining.toLocaleString() || "0"}
          </span>
        </div>
      </div>
    </div>
  );
}

