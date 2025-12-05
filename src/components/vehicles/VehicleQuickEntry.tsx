/** Vehicle quick entry component for chat interface */

import React, { useState } from "react";
import { CarIcon, SearchIcon, PlusIcon } from "../icons/AutomotiveIcons";
import { searchVehicles, createVehicle } from "../../api/vehicles";
import { useWorkshopStore } from "../../stores/workshop.store";
import type { Vehicle } from "../../types/vehicle.types";

interface VehicleQuickEntryProps {
  onSelect: (vehicle: Vehicle) => void;
  onCancel?: () => void;
  initialLicensePlate?: string;
}

export function VehicleQuickEntry({
  onSelect,
  onCancel,
  initialLicensePlate = "",
}: VehicleQuickEntryProps) {
  const { currentWorkshop } = useWorkshopStore();
  const [licensePlate, setLicensePlate] = useState(initialLicensePlate.toUpperCase());
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Vehicle[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createData, setCreateData] = useState({
    license_plate: initialLicensePlate.toUpperCase(),
    make: "",
    model: "",
    year: undefined as number | undefined,
    current_km: undefined as number | undefined,
    engine_type: "",
    fuel_type: "",
  });

  const handleSearch = async () => {
    if (!licensePlate.trim()) return;

    setIsSearching(true);
    try {
      const results = await searchVehicles(licensePlate);
      setSearchResults(results);
      if (results.length === 0) {
        setShowCreateForm(true);
        setCreateData((prev) => ({ ...prev, license_plate: licensePlate.toUpperCase() }));
      }
    } catch (error) {
      console.error("Failed to search vehicles:", error);
      setSearchResults([]);
      setShowCreateForm(true);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCreate = async () => {
    if (!createData.license_plate.trim()) return;

    try {
      const vehicle = await createVehicle({
        ...createData,
        workshop_id: currentWorkshop?.id,
      });
      onSelect(vehicle);
    } catch (error) {
      console.error("Failed to create vehicle:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (showCreateForm) {
        handleCreate();
      } else {
        handleSearch();
      }
    }
  };

  return (
    <div className="glass-strong rounded-lg p-4 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
          <CarIcon size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-industrial-100">Vehicle Quick Entry</h3>
          <p className="text-sm text-industrial-400">Search or create a vehicle</p>
        </div>
      </div>

      {/* Search Section */}
      {!showCreateForm && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              placeholder="Enter license plate (e.g., ABC123)"
              className="flex-1 input-industrial"
              autoFocus
            />
            <button
              onClick={handleSearch}
              disabled={isSearching || !licensePlate.trim()}
              className="btn-primary px-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? (
                <span className="animate-pulse">Searching...</span>
              ) : (
                <>
                  <SearchIcon size={18} className="inline mr-2" />
                  Search
                </>
              )}
            </button>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              <p className="text-xs text-industrial-400 font-medium">Found {searchResults.length} vehicle(s):</p>
              {searchResults.map((vehicle) => (
                <button
                  key={vehicle.id}
                  onClick={() => onSelect(vehicle)}
                  className="w-full card-industrial hover:border-primary-500/50 transition-colors text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-industrial-100">{vehicle.license_plate}</div>
                      {vehicle.make && vehicle.model && (
                        <div className="text-sm text-industrial-400">
                          {vehicle.make} {vehicle.model} {vehicle.year && `(${vehicle.year})`}
                        </div>
                      )}
                      {vehicle.current_km && (
                        <div className="text-xs text-industrial-500 mt-1">
                          {vehicle.current_km.toLocaleString()} km
                        </div>
                      )}
                    </div>
                    <div className="text-primary-400">
                      <CarIcon size={20} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No Results - Show Create Option */}
          {searchResults.length === 0 && licensePlate && !isSearching && (
            <button
              onClick={() => {
                setShowCreateForm(true);
                setCreateData((prev) => ({ ...prev, license_plate: licensePlate.toUpperCase() }));
              }}
              className="w-full btn-industrial flex items-center justify-center gap-2"
            >
              <PlusIcon size={18} />
              Create New Vehicle: {licensePlate}
            </button>
          )}
        </div>
      )}

      {/* Create Form */}
      {showCreateForm && (
        <div className="space-y-3 animate-slide-up">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-industrial-400 mb-1 block">License Plate *</label>
              <input
                type="text"
                value={createData.license_plate}
                onChange={(e) =>
                  setCreateData((prev) => ({
                    ...prev,
                    license_plate: e.target.value.toUpperCase(),
                  }))
                }
                className="input-industrial"
                placeholder="ABC123"
                required
              />
            </div>
            <div>
              <label className="text-xs text-industrial-400 mb-1 block">Current KM</label>
              <input
                type="number"
                value={createData.current_km || ""}
                onChange={(e) =>
                  setCreateData((prev) => ({
                    ...prev,
                    current_km: e.target.value ? parseInt(e.target.value) : undefined,
                  }))
                }
                className="input-industrial"
                placeholder="50000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-industrial-400 mb-1 block">Make</label>
              <input
                type="text"
                value={createData.make}
                onChange={(e) => setCreateData((prev) => ({ ...prev, make: e.target.value }))}
                className="input-industrial"
                placeholder="Toyota"
              />
            </div>
            <div>
              <label className="text-xs text-industrial-400 mb-1 block">Model</label>
              <input
                type="text"
                value={createData.model}
                onChange={(e) => setCreateData((prev) => ({ ...prev, model: e.target.value }))}
                className="input-industrial"
                placeholder="Camry"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-industrial-400 mb-1 block">Year</label>
              <input
                type="number"
                value={createData.year || ""}
                onChange={(e) =>
                  setCreateData((prev) => ({
                    ...prev,
                    year: e.target.value ? parseInt(e.target.value) : undefined,
                  }))
                }
                className="input-industrial"
                placeholder="2020"
                min="1900"
                max={new Date().getFullYear() + 1}
              />
            </div>
            <div>
              <label className="text-xs text-industrial-400 mb-1 block">Fuel Type</label>
              <select
                value={createData.fuel_type}
                onChange={(e) => setCreateData((prev) => ({ ...prev, fuel_type: e.target.value }))}
                className="input-industrial"
              >
                <option value="">Select...</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-industrial-400 mb-1 block">Engine Type</label>
            <input
              type="text"
              value={createData.engine_type}
              onChange={(e) => setCreateData((prev) => ({ ...prev, engine_type: e.target.value }))}
              className="input-industrial"
              placeholder="2.0L Turbo"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleCreate}
              disabled={!createData.license_plate.trim()}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlusIcon size={18} className="inline mr-2" />
              Create Vehicle
            </button>
            <button
              onClick={() => {
                setShowCreateForm(false);
                setCreateData({
                  license_plate: licensePlate.toUpperCase(),
                  make: "",
                  model: "",
                  year: undefined,
                  current_km: undefined,
                  engine_type: "",
                  fuel_type: "",
                });
              }}
              className="btn-industrial"
            >
              Back
            </button>
            {onCancel && (
              <button onClick={onCancel} className="btn-industrial">
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

