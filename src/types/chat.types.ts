/** Chat-related TypeScript types */

export interface ChatThread {
  id: string;
  workshop_id: string;
  user_id: string;
  vehicle_id?: string;
  title?: string;
  license_plate: string;
  vehicle_km?: number;
  error_codes?: string;
  vehicle_context?: string;
  total_prompt_tokens: number;
  total_completion_tokens: number;
  total_tokens: number;
  estimated_cost?: number;
  status: "active" | "completed" | "archived";
  is_resolved: boolean;
  is_archived: boolean;
  last_message_at?: string;
  session_metadata?: Record<string, any>;
  version: number;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  thread_id: string;
  user_id: string;
  role: "user" | "assistant" | "system";
  sender_type: "technician" | "ai" | "system";
  content: string;
  is_markdown: boolean;
  attachments?: {
    error_codes?: string;
    images?: string[];
    files?: string[];
    [key: string]: any;
  };
  ai_model_used?: string;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  estimated_cost?: number;
  sequence_number: number;
  is_edited: boolean;
  edited_at?: string;
  message_metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ChatThreadResponse {
  thread: ChatThread;
  messages: ChatMessage[];
}

export interface ChatThreadListResponse {
  threads: ChatThread[];
}

export interface CreateChatThreadRequest {
  workshop_id: string;
  license_plate: string;
  vehicle_id?: string;
  vehicle_km?: number;
  error_codes?: string;
  vehicle_context?: string;
}

export interface SendMessageRequest {
  content: string;
  attachments?: Record<string, any>;
  is_markdown?: boolean;
}

export interface SendMessageResponse {
  user_message: ChatMessage;
  assistant_message: ChatMessage;
}

export interface WebSocketMessage {
  type: "message" | "typing" | "error" | "status";
  user_message?: ChatMessage;
  assistant_message?: ChatMessage;
  thread?: Partial<ChatThread>;
  user_id?: string;
  message?: string;
  status?: string;
  timestamp: string;
}
