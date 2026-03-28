"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { AlgorithmProblem } from "@/types/dsa";
import type { UserAssistantChatMessage } from "@/types/ai";
import { Card } from "@/components/ui/card";
import { useAiChat } from "@/hooks/ai/useAiChat";

function Spinner() {
  return (
    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[var(--accent)]/60 border-t-[var(--accent)]" />
  );
}

function formatForBubble(message: UserAssistantChatMessage) {
  // Keep formatting simple and product-like; no markdown parsing.
  return message.content;
}

export function AskDoubtChat({ problem }: { problem: AlgorithmProblem }) {
  const { isLoading, error, askDoubt } = useAiChat();
  const [messages, setMessages] = useState<UserAssistantChatMessage[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const problemLabel = useMemo(
    () => `${problem.title} (${problem.difficulty})`,
    [problem.difficulty, problem.title]
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  const canSend = input.trim().length > 0 && !isLoading;

  return (
    <Card className="flex min-h-[320px] flex-col">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold">Ask Doubt</h3>
          <p className="text-xs text-[var(--muted)]">Questions about: {problemLabel}</p>
        </div>
      </div>

      <div className="mt-3 flex-1">
        <div className="h-[220px] overflow-auto rounded-md border bg-[var(--surface-alt)] p-3">
          {messages.length === 0 && !isLoading ? (
            <div className="text-xs text-[var(--muted)]">
              Ask anything about the logic, intuition, or edge cases. Example:
              <div className="mt-2 rounded border bg-[#101927] p-2">
                &quot;Why do we move the left/right pointer in this problem?&quot;
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((m, idx) => (
                <div
                  key={`${idx}-${m.role}`}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[90%] whitespace-pre-wrap rounded-md border p-2 text-xs ${
                      m.role === "user"
                        ? "border-[var(--accent)] bg-[#0a2434] text-[var(--foreground)]"
                        : "border-[var(--border)] bg-[#101927] text-[var(--muted)]"
                    }`}
                  >
                    {formatForBubble(m)}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-md border bg-[#101927] p-2 text-xs text-[var(--muted)]">
                    <Spinner />
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {error && (
          <div className="rounded-md border border-[var(--danger)] bg-[#2b1316] p-2 text-xs text-[#fecaca]">
            {error}
          </div>
        )}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a doubt..."
            disabled={isLoading}
            className="flex-1 rounded-md border bg-[#0f1724] px-3 py-2 text-xs text-[var(--foreground)] placeholder:text-[var(--muted)] disabled:opacity-60"
            onKeyDown={(e) => {
              if (e.key === "Enter" && canSend) {
                void (async () => {
                  const userText = input.trim();
                  const nextMessages: UserAssistantChatMessage[] = [
                    ...messages,
                    { role: "user", content: userText },
                  ];
                  setMessages(nextMessages);
                  setInput("");
                  try {
                    const reply = await askDoubt({
                      problemId: problem.id,
                      messages: nextMessages,
                    });
                    setMessages([
                      ...nextMessages,
                      { role: "assistant", content: reply },
                    ]);
                  } catch {
                    // The hook stores error state; keep the chat as-is.
                  }
                })();
              }
            }}
          />
          <button
            type="button"
            disabled={!canSend}
            onClick={async () => {
              const userText = input.trim();
              const nextMessages: UserAssistantChatMessage[] = [
                ...messages,
                { role: "user", content: userText },
              ];
              setMessages(nextMessages);
              setInput("");
              try {
                const reply = await askDoubt({
                  problemId: problem.id,
                  messages: nextMessages,
                });
                setMessages([
                  ...nextMessages,
                  { role: "assistant", content: reply },
                ]);
              } catch {
                // hook handles error display
              }
            }}
            className="rounded-md bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-[#06131d] disabled:opacity-60"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
        <p className="text-[10px] text-[var(--muted)]">
          AI answer is based on the selected algorithm context.
        </p>
      </div>
    </Card>
  );
}

