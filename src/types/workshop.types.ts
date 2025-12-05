/** Workshop and multi-tenant types */

export interface VehicleTemplate {
  name: string;
  make?: string;
  model?: string;
  year?: number;
  engine_type?: string;
  fuel_type?: string;
  default_fields?: Record<string, any>;
}

export interface QuickReply {
  label: string;
  message: string;
  category?: string;
}

export interface DiagnosticCodeEntry {
  code: string;
  description: string;
  severity: "critical" | "warning" | "info";
  common_causes?: string[];
  notes?: string;
}

export interface Workshop {
  id: string;
  name: string;
  slug: string;
  description?: string;
  owner_id: string;
  monthly_token_limit: number;
  tokens_used_this_month: number;
  is_active: boolean;
  allow_auto_invites: boolean;
  logo_url?: string;
  primary_color?: string;
  vehicle_templates?: Record<string, VehicleTemplate>;
  quick_replies?: Record<string, QuickReply>;
  diagnostic_code_library?: Record<string, DiagnosticCodeEntry>;
  created_at: string;
  updated_at: string;
}

export interface WorkshopMember {
  id: string;
  workshop_id: string;
  user_id: string;
  role: "owner" | "admin" | "technician" | "member" | "viewer";
  is_active: boolean;
  invited_by?: string;
  created_at: string;
}

export interface WorkshopListResponse {
  workshops: Workshop[];
}

