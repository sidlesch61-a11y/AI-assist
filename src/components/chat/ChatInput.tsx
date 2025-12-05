import { useState } from "react";
import { Button } from "../common/Button";

interface ChatInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Type your message...",
}: ChatInputProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && !disabled) {
      onSend(content.trim());
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-lg p-4 border border-slate-700/50">
      <div className="flex gap-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          rows={3}
          className="flex-1 glass rounded-lg border border-slate-700/50 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
        />
        <Button
          type="submit"
          disabled={!content.trim() || disabled}
          className="self-end"
        >
          {disabled ? "Sending..." : "Send"}
        </Button>
      </div>
    </form>
  );
}

