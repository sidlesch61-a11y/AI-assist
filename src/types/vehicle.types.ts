/** Vehicle-related TypeScript types */

export interface Vehicle {
  id: string;
  license_plate: string;
  vehicle_type?: string;
  make?: string;
  model?: string;
  year?: number;
  vin?: string;
  current_km?: number;
  last_service_km?: number;
  last_service_date?: string;
  engine_type?: string;
  fuel_type?: string;
  workshop_id?: string;
  created_by_user_id?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateVehicleRequest {
  license_plate: string;
  vehicle_type?: string;
  make?: string;
  model?: string;
  year?: number;
  vin?: string;
  current_km?: number;
  engine_type?: string;
  fuel_type?: string;
  workshop_id?: string;
}

export interface SearchVehiclesResponse {
  vehicles: Vehicle[];
}

