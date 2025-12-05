/** Vehicle details panel component */

import React, { useEffect, useState } from "react";
import { getVehicle } from "../../api/vehicles";
import { CarIcon, SpeedometerIcon, AlertIcon } from "../icons/AutomotiveIcons";

interface VehicleDetailsPanelProps {
  vehicleId: string;
}

export function VehicleDetailsPanel({ vehicleId }: VehicleDetailsPanelProps) {
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVehicle();
  }, [vehicleId]);

  const loadVehicle = async () => {
    try {
      const data = await getVehicle(vehicleId);
      setVehicle(data);
    } catch (err) {
      console.error("Failed to load vehicle:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card-industrial animate-pulse">
        <div className="h-4 bg-industrial-700 rounded w-3/4 mb-2" />
        <div className="h-2 bg-industrial-700 rounded" />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="card-industrial text-center text-industrial-500">
        Vehicle not found
      </div>
    );
  }

  return (
    <div className="vehicle-info">
      {/* License Plate */}
      <div className="flex items-center gap-2 mb-3">
        <CarIcon size={20} className="text-primary-400" />
        <h3 className="font-semibold text-industrial-200 text-lg">
          {vehicle.license_plate}
        </h3>
      </div>

      {/* Vehicle Info */}
      <div className="space-y-2 text-sm">
        {vehicle.make && vehicle.model && (
          <div className="flex justify-between">
            <span className="text-industrial-400">Make/Model:</span>
            <span className="text-industrial-200">
              {vehicle.make} {vehicle.model}
            </span>
          </div>
        )}

        {vehicle.year && (
          <div className="flex justify-between">
            <span className="text-industrial-400">Year:</span>
            <span className="text-industrial-200">{vehicle.year}</span>
          </div>
        )}

        {vehicle.vin && (
          <div className="flex justify-between">
            <span className="text-industrial-400">VIN:</span>
            <span className="text-industrial-200 font-mono text-xs">
              {vehicle.vin}
            </span>
          </div>
        )}

        {/* Current KM */}
        {vehicle.current_km && (
          <div className="flex items-center justify-between pt-2 border-t border-industrial-700">
            <div className="flex items-center gap-2">
              <SpeedometerIcon size={16} className="text-industrial-500" />
              <span className="text-industrial-400">Current KM:</span>
            </div>
            <span className="text-industrial-200 font-semibold">
              {vehicle.current_km.toLocaleString()} km
            </span>
          </div>
        )}

        {/* Last Service */}
        {vehicle.last_service_km && (
          <div className="flex justify-between">
            <span className="text-industrial-400">Last Service KM:</span>
            <span className="text-industrial-200">
              {vehicle.last_service_km.toLocaleString()} km
            </span>
          </div>
        )}

        {vehicle.last_service_date && (
          <div className="flex justify-between">
            <span className="text-industrial-400">Last Service Date:</span>
            <span className="text-industrial-200">
              {new Date(vehicle.last_service_date).toLocaleDateString()}
            </span>
          </div>
        )}

        {/* Engine & Fuel Type */}
        {(vehicle.engine_type || vehicle.fuel_type) && (
          <div className="pt-2 border-t border-industrial-700 space-y-1">
            {vehicle.engine_type && (
              <div className="flex justify-between">
                <span className="text-industrial-400">Engine:</span>
                <span className="text-industrial-200">{vehicle.engine_type}</span>
              </div>
            )}
            {vehicle.fuel_type && (
              <div className="flex justify-between">
                <span className="text-industrial-400">Fuel:</span>
                <span className="text-industrial-200">{vehicle.fuel_type}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

