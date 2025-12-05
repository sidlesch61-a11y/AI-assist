/** Quick vehicle entry component for creating vehicles on the fly */

import React, { useState } from "react";
import { createVehicle } from "../../../api/vehicles";
import { useWorkshopStore } from "../../../stores/workshop.store";
import { Button } from "../../../components/common/Button";
import { CarIcon } from "../../../components/icons/AutomotiveIcons";
import type { Vehicle } from "../../../api/vehicles";

interface QuickEntryProps {
  onVehicleCreated?: (vehicle: Vehicle) => void;
}

export function QuickEntry({ onVehicleCreated }: QuickEntryProps) {
  const { currentWorkshop } = useWorkshopStore();
  const [licensePlate, setLicensePlate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWorkshop || !licensePlate.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const vehicle = await createVehicle({
        license_plate: licensePlate.trim().toUpperCase(),
        workshop_id: currentWorkshop.id,
      });
      setLicensePlate("");
      onVehicleCreated?.(vehicle);
    } catch (err: any) {
      console.error("Failed to create vehicle:", err);
      setError(err.response?.data?.detail || "Failed to create vehicle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-industrial space-y-3">
      <div className="flex items-center gap-2">
        <CarIcon size={18} className="text-primary-400" />
        <h3 className="font-semibold text-industrial-200 text-sm">
          Quick Vehicle Entry
        </h3>
      </div>

      <div>
        <input
          type="text"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
          placeholder="License Plate (e.g., ABC-123)"
          className="input-industrial w-full"
          disabled={loading}
        />
      </div>

      {error && (
        <p className="text-xs text-error-400">{error}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={loading || !licensePlate.trim()}
      >
        {loading ? "Creating..." : "Add Vehicle"}
      </Button>
    </form>
  );
}

