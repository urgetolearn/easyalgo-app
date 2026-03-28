"use client";

import { useCallback, useState } from "react";
import type { UserAssistantChatMessage } from "@/types/ai";

export function useAiChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const askDoubt = useCallback(async (params: {
    problemId: string;
    messages: UserAssistantChatMessage[];
  }): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      const data = (await res.json()) as { reply?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Failed to generate AI response");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.reply) {
        throw new Error("AI response missing reply");
      }

      return data.reply;
    } catch (e) {
      const message = e instanceof Error ? e.message : "AI chat failed";
      setError(message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, askDoubt };
}

