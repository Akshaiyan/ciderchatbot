"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { type Message } from "@/lib/anthropic";

type Props = {
  message: Message;
  isStreaming?: boolean;
};

function CIAvatar() {
  return (
    <div
      className="flex h-7 w-7 flex-shrink-0 items-center justify-center text-[10px] font-medium uppercase tracking-wider text-white"
      style={{
        fontFamily: "var(--font-oswald)",
        background: "rgba(133,45,45,0.85)",
        border: "1px solid rgba(133,45,45,0.4)",
        backdropFilter: "blur(8px)",
      }}
    >
      CI
    </div>
  );
}

function UserAvatar() {
  return (
    <div
      className="flex h-7 w-7 flex-shrink-0 items-center justify-center text-[10px] font-medium uppercase tracking-wider text-[#3d3d3d]/60"
      style={{
        fontFamily: "var(--font-oswald)",
        background: "rgba(255,255,255,0.55)",
        border: "1px solid rgba(0,0,0,0.1)",
        backdropFilter: "blur(8px)",
      }}
    >
      You
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-1">
      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#852d2d]/40" />
      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#852d2d]/40" />
      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#852d2d]/40" />
    </div>
  );
}

export function MessageBubble({ message, isStreaming }: Props) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex items-start justify-end gap-2">
        <div
          className="max-w-[76%] px-4 py-3 text-sm text-[#3d3d3d]"
          style={{
            background: "rgba(255,255,255,0.65)",
            border: "1px solid rgba(255,255,255,0.8)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            fontFamily: "var(--font-lato)",
            lineHeight: "1.65",
          }}
        >
          {message.content}
        </div>
        <UserAvatar />
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2">
      <CIAvatar />
      <div
        className="max-w-[82%] px-4 py-3"
        style={{
          background: "rgba(255,255,255,0.5)",
          border: "1px solid rgba(255,255,255,0.72)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
        }}
      >
        {isStreaming && message.content === "" ? (
          <TypingIndicator />
        ) : (
          <div className="prose-chat">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
