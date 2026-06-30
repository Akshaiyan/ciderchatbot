"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { SampleQuestions } from "./SampleQuestions";
import { type Message } from "@/lib/anthropic";

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hello — I'm the Cider Institute knowledge assistant. Ask me anything about cidermaking: fermentation science, acid management, yeast selection, sensory evaluation, and more.",
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [streamingContent, setStreamingContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // Buffer written by the stream reader; flushed to state on an interval
  const bufferRef = useRef("");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMsg: Message = { role: "user", content: trimmed };
      const history = [...messages, userMsg];

      setMessages(history);
      setStreamingContent("");   // "" = typing indicator visible
      setIsLoading(true);
      bufferRef.current = "";
      if (inputRef.current) { inputRef.current.value = ""; inputRef.current.style.height = "auto"; }

      // Flush buffer → state at a steady 40 ms — smooth without thrashing React
      const intervalId = setInterval(() => {
        setStreamingContent(bufferRef.current);
      }, 40);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error ?? "Request failed");
        }
        if (!res.body) throw new Error("No response body");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          bufferRef.current += decoder.decode(value, { stream: true });
        }
      } catch (err) {
        bufferRef.current = `Error: ${err instanceof Error ? err.message : "Something went wrong."}`;
      } finally {
        clearInterval(intervalId);
        // Commit final text to permanent messages and stop streaming
        const finalContent = bufferRef.current;
        setMessages([...history, { role: "assistant", content: finalContent }]);
        setStreamingContent(null);
        setIsLoading(false);
        inputRef.current?.focus();
      }
    },
    [messages, isLoading]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputRef.current?.value ?? "");
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div className="chat-scrollbar flex-1 overflow-y-auto px-6 py-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-5">

          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} />
          ))}

          {/* Live streaming bubble — isolated so completed messages never re-render */}
          {streamingContent !== null && (
            <MessageBubble
              message={{ role: "assistant", content: streamingContent }}
              isStreaming={streamingContent === ""}
            />
          )}

          {messages.length === 1 && streamingContent === null && (
            <div className="mt-1">
              <SampleQuestions onSelect={sendMessage} disabled={isLoading} />
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div
        className="flex-shrink-0 px-6 py-4"
        style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="mx-auto max-w-3xl">
          <div className="glass-input flex items-end gap-3 px-4 py-3">
            <textarea
              ref={inputRef}
              onKeyDown={handleKeyDown}
              placeholder="Ask about cidermaking…"
              disabled={isLoading}
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm text-[#3d3d3d] outline-none placeholder:text-[#3d3d3d]/30 disabled:opacity-50"
              style={{ maxHeight: "120px", fontFamily: "var(--font-lato)" }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
              }}
            />
            <button
              onClick={() => sendMessage(inputRef.current?.value ?? "")}
              disabled={isLoading}
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-white transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
              style={{ background: "#852d2d" }}
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
          <p
            className="mt-2 text-[10px] uppercase tracking-[1px] text-[#3d3d3d]/30"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
