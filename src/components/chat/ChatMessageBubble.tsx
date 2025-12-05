/** Chat message bubble component with technician/AI/system styling */

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { formatDateTime } from "../../utils/formatters";
import { DiagnosticCode } from "../common/DiagnosticCode";
import type { ChatMessage } from "../../types/chat.types";

// Format time as [HH:MM]
function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `[${hours}:${minutes}]`;
}

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const [showTimestamp, setShowTimestamp] = useState(false);

  // System messages (centered, informational)
  if (message.sender_type === "system") {
    return (
      <div className="msg-system-dark mb-4">
        <div className="flex items-center justify-center gap-2">
          <p className="text-warning-400">{message.content}</p>
        </div>
      </div>
    );
  }

  // AI messages (left-aligned, white/dark with green accent)
  if (message.role === "assistant" || message.sender_type === "ai") {
    return (
      <div className="msg-ai-dark mb-4">
        <div className="flex items-start gap-3">
          {/* AI Avatar */}
          <div className="w-8 h-8 rounded-full bg-success-500/20 border border-success-500/30 flex items-center justify-center flex-shrink-0">
            <div className="w-4 h-4 bg-success-400 rounded-full" />
          </div>

          {/* Message Content */}
          <div className="flex-1 space-y-2">
            {/* Timestamp and Sender Label */}
            <div className="flex items-center gap-2 text-xs text-industrial-500">
              <span className="font-mono">{formatTime(message.created_at)}</span>
              <span className="text-industrial-400">AI Assistant (Diagnostic Bot):</span>
            </div>

            {/* Message Content */}
            {message.is_markdown ? (
              <div className="prose prose-invert prose-sm max-w-none text-industrial-100">
                <ReactMarkdown
                  components={{
                    code: ({ node, className, children, ...props }: any) => {
                      const codeString = String(children).replace(/\n$/, "");
                      
                      // Check if it's a diagnostic code (P####, B####, C####, U####)
                      if (codeString.match(/^[PBCU]\d{4}$/i)) {
                        return (
                          <DiagnosticCode
                            code={codeString.toUpperCase()}
                            variant="error"
                          />
                        );
                      }
                      
                      return (
                        <code
                          className="bg-industrial-800 px-1.5 py-0.5 rounded text-xs font-mono text-warning-400"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    // Custom rendering for boxed sections
                    blockquote: ({ children }: any) => {
                      const content = String(children);
                      // Check if it's a boxed section (starts with ┌ or contains LIKELY CAUSES, etc.)
                      if (content.includes("┌") || content.includes("LIKELY CAUSES") || content.includes("RECOMMENDED")) {
                        return (
                          <div className="my-3 border border-industrial-700 rounded-lg bg-industrial-800/50 p-4">
                            <div className="text-industrial-200 whitespace-pre-wrap font-mono text-sm">
                              {content.replace(/┌|─|│|└|┐|┘/g, "").trim()}
                            </div>
                          </div>
                        );
                      }
                      return <blockquote className="border-l-4 border-primary-500 pl-4 my-3 text-industrial-300">{children}</blockquote>;
                    },
                    ul: ({ children }: any) => (
                      <ul className="list-disc list-inside space-y-1 my-2 text-industrial-200">{children}</ul>
                    ),
                    ol: ({ children }: any) => (
                      <ol className="list-decimal list-inside space-y-1 my-2 text-industrial-200">{children}</ol>
                    ),
                    li: ({ children }: any) => (
                      <li className="text-industrial-200">{children}</li>
                    ),
                    p: ({ children }: any) => (
                      <p className="text-industrial-100 my-2 leading-relaxed">{children}</p>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-industrial-100 whitespace-pre-wrap leading-relaxed">
                {message.content}
              </div>
            )}

            {/* Error Codes from Attachments */}
            {message.attachments?.error_codes && (
              <div className="mt-3 pt-3 border-t border-industrial-700 flex flex-wrap gap-2">
                {message.attachments.error_codes
                  .split(",")
                  .map((code: string) => code.trim())
                  .filter(Boolean)
                  .map((code: string) => (
                    <DiagnosticCode
                      key={code}
                      code={code.toUpperCase()}
                      variant="error"
                    />
                  ))}
              </div>
            )}

            {/* Token info (on hover) */}
            {message.total_tokens > 0 && (
              <div className="text-xs text-industrial-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {message.total_tokens} tokens
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Technician messages (right-aligned, blue gradient)
  return (
    <div className="msg-technician mb-4">
      <div className="flex items-start gap-3 justify-end">
        {/* Message Content */}
        <div className="flex-1 max-w-[80%]">
          {/* Timestamp and Sender Label */}
          <div className="flex items-center gap-2 justify-end text-xs text-white/70 mb-1">
            <span className="text-white/50">Technician (You):</span>
            <span className="font-mono">{formatTime(message.created_at)}</span>
          </div>

          {/* Message Content */}
          {message.is_markdown ? (
            <div className="prose prose-invert prose-sm max-w-none text-white">
              <ReactMarkdown
                components={{
                  code: ({ node, className, children, ...props }: any) => {
                    const codeString = String(children).replace(/\n$/, "");
                    
                    if (codeString.match(/^[PBCU]\d{4}$/i)) {
                      return (
                        <DiagnosticCode
                          code={codeString.toUpperCase()}
                          variant="error"
                        />
                      );
                    }
                    
                    return (
                      <code
                        className="bg-white/20 px-1.5 py-0.5 rounded text-xs font-mono text-white"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="text-white whitespace-pre-wrap leading-relaxed">
              {message.content}
            </div>
          )}

          {/* Error Codes from Attachments */}
          {message.attachments?.error_codes && (
            <div className="mt-3 pt-3 border-t border-white/20 flex flex-wrap gap-2 justify-end">
              {message.attachments.error_codes
                .split(",")
                .map((code: string) => code.trim())
                .filter(Boolean)
                .map((code: string) => (
                  <DiagnosticCode
                    key={code}
                    code={code.toUpperCase()}
                    variant="error"
                  />
                ))}
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-semibold">T</span>
        </div>
      </div>
    </div>
  );
}
