/** Chat input component - re-export from components */

import { ChatInputSection } from "../../../components/chat/ChatInputSection";

interface ChatInputProps {
  onSend: (content: string, attachments?: any) => void;
  disabled?: boolean;
  placeholder?: string;
  estimatedTokens?: number;
  remainingTokens?: number;
  tokenLimit?: number;
  errorCodes?: string[];
  onErrorCodesChange?: (codes: string[]) => void;
  vehicleData?: {
    license_plate?: string;
    make?: string;
    model?: string;
    year?: number;
    current_km?: number;
  };
}

export function ChatInput(props: ChatInputProps) {
  return <ChatInputSection {...props} />;
}

