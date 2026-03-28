"use client";

import { useCallback, useState } from "react";
import type { ExplainLikeI5Response } from "@/types/ai";

export function useAiExplain() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const explainLikeI5 = useCallback(async (problemId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId }),
      });

      const data = (await res.json()) as
        | (ExplainLikeI5Response & { mock?: boolean })
        | { error?: string };

      if (!res.ok) {
        throw new Error("Failed to generate AI explanation");
      }

      if ("error" in data && data.error) {
        throw new Error(data.error);
      }

      // `mock` response is shaped the same as the real one.
      return data as ExplainLikeI5Response;
    } catch (e) {
      const message = e instanceof Error ? e.message : "AI explanation failed";
      setError(message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, explainLikeI5 };
}

