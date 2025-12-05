/** Admin dashboard for workshop management */

import React, { useEffect, useState } from "react";
import { useWorkshopStore } from "../../stores/workshop.store";
import { fetchWorkshops } from "../../api/workshops";
import { ActivityIcon, UsersIcon, SettingsIcon } from "../../components/icons/AutomotiveIcons";
import { Button } from "../../components/common/Button";

export function WorkshopDashboard() {
  const { currentWorkshop, setCurrentWorkshop } = useWorkshopStore();
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalSessions: 0,
    activeSessions: 0,
    totalTokens: 0,
    members: 0,
  });

  useEffect(() => {
    loadWorkshops();
    if (currentWorkshop) {
      loadStats();
    }
  }, [currentWorkshop]);

  const loadWorkshops = async () => {
    setLoading(true);
    try {
      const data = await fetchWorkshops();
      setWorkshops(data.workshops || []);
    } catch (err) {
      console.error("Failed to load workshops:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    // TODO: Implement stats API
    setStats({
      totalSessions: 0,
      activeSessions: 0,
      totalTokens: 0,
      members: 0,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-industrial-100">Workshop Dashboard</h1>
        <Button variant="primary">Create Workshop</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-industrial-400">Total Sessions</span>
            <ActivityIcon size={20} className="text-primary-400" />
          </div>
          <div className="text-2xl font-bold text-industrial-100">{stats.totalSessions}</div>
        </div>

        <div className="glass rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-industrial-400">Active Sessions</span>
            <ActivityIcon size={20} className="text-success-400" />
          </div>
          <div className="text-2xl font-bold text-industrial-100">{stats.activeSessions}</div>
        </div>

        <div className="glass rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-industrial-400">Tokens Used</span>
            <ActivityIcon size={20} className="text-warning-400" />
          </div>
          <div className="text-2xl font-bold text-industrial-100">
            {stats.totalTokens.toLocaleString()}
          </div>
        </div>

        <div className="glass rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-industrial-400">Members</span>
            <UsersIcon size={20} className="text-primary-400" />
          </div>
          <div className="text-2xl font-bold text-industrial-100">{stats.members}</div>
        </div>
      </div>

      {/* Workshops List */}
      <div className="glass rounded-lg p-4">
        <h2 className="text-lg font-semibold text-industrial-200 mb-4">Workshops</h2>
        {loading ? (
          <div className="text-center py-8 text-industrial-400">Loading...</div>
        ) : workshops.length === 0 ? (
          <div className="text-center py-8 text-industrial-400">No workshops found</div>
        ) : (
          <div className="space-y-2">
            {workshops.map((workshop) => (
              <div
                key={workshop.id}
                className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                  currentWorkshop?.id === workshop.id
                    ? "bg-primary-700/30 border-primary-500/50"
                    : "glass border-industrial-700 hover:bg-industrial-800/50"
                }`}
                onClick={() => setCurrentWorkshop(workshop)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-industrial-200">{workshop.name}</h3>
                    <p className="text-sm text-industrial-400">{workshop.description}</p>
                  </div>
                  <SettingsIcon size={20} className="text-industrial-500" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

