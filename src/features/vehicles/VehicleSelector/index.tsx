/** Vehicle selector component */

import React, { useState, useEffect } from "react";
import { fetchVehicles } from "../../../api/vehicles";
import { CarIcon } from "../../../components/icons/AutomotiveIcons";
import type { Vehicle } from "../../../api/vehicles";

interface VehicleSelectorProps {
  workshopId?: string;
  onSelectVehicle: (vehicle: Vehicle) => void;
  selectedVehicleId?: string;
}

export function VehicleSelector({
  workshopId,
  onSelectVehicle,
  selectedVehicleId,
}: VehicleSelectorProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (workshopId) {
      loadVehicles();
    }
  }, [workshopId]);

  const loadVehicles = async () => {
    if (!workshopId) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetchVehicles({ workshop_id: workshopId });
      setVehicles(response.vehicles);
    } catch (err: any) {
      console.error("Failed to load vehicles:", err);
      setError(err.response?.data?.detail || "Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };

  if (loading && vehicles.length === 0) {
    return (
      <div className="card-industrial animate-pulse">
        <div className="h-4 bg-industrial-700 rounded w-3/4 mb-2" />
        <div className="h-2 bg-industrial-700 rounded" />
      </div>
    );
  }

  if (error && vehicles.length === 0) {
    return (
      <div className="card-industrial border border-error-500/30">
        <p className="text-sm text-error-400">{error}</p>
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="card-industrial text-center text-industrial-500">
        <p className="text-sm">No vehicles registered</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {vehicles.map((vehicle) => (
        <button
          key={vehicle.id}
          onClick={() => onSelectVehicle(vehicle)}
          className={`w-full text-left p-3 rounded-lg transition-all ${
            selectedVehicleId === vehicle.id
              ? "bg-primary-700/30 border border-primary-500/50"
              : "glass hover:bg-industrial-800/50 border border-industrial-700/50"
          }`}
        >
          <div className="flex items-center gap-2">
            <CarIcon size={18} className="text-primary-400" />
            <div className="flex-1">
              <div className="font-medium text-sm text-industrial-200">
                {vehicle.license_plate}
              </div>
              {vehicle.make && vehicle.model && (
                <div className="text-xs text-industrial-400">
                  {vehicle.make} {vehicle.model}
                </div>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

