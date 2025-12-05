export interface Consultation {
  id: string;
  user_id: string;
  vehicle_id?: string | null;
  license_plate: string;
  query: string;
  ai_response: string;
  ai_model_used: string;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  estimated_cost?: number | null;
  is_resolved: boolean;
  resolution_notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateConsultationRequest {
  license_plate: string;
  query: string;
  vehicle_id?: string | null;
}


