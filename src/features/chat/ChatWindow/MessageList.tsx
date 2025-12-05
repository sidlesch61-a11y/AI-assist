/** Message list component - re-export from components */

import { MessageArea } from "../../../components/chat/MessageArea";
import type { ChatMessage } from "../../../types/chat.types";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading?: boolean;
  typingUsers?: Set<string>;
}

export function MessageList(props: MessageListProps) {
  return <MessageArea {...props} />;
}
