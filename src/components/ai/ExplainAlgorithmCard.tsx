"use client";

import { useState } from "react";
import type { AlgorithmProblem } from "@/types/dsa";
import type { ExplainLikeI5Response } from "@/types/ai";
import { Card } from "@/components/ui/card";
import { useAiExplain } from "@/hooks/ai/useAiExplain";

function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[var(--accent)]/60 border-t-[var(--accent)]" />
      {label ?? "Loading"}
    </div>
  );
}

export function ExplainAlgorithmCard({ problem }: { problem: AlgorithmProblem }) {
  const { isLoading, error, explainLikeI5 } = useAiExplain();
  const [result, setResult] = useState<ExplainLikeI5Response | null>(null);

  return (
    <Card className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold">Explain Like I&apos;m 5</h3>
          <p className="text-xs text-[var(--muted)]">
            Simple intuition for: {problem.title}
          </p>
        </div>
        <button
          type="button"
          onClick={async () => {
            setResult(null);
            const next = await explainLikeI5(problem.id);
            setResult(next);
          }}
          disabled={isLoading}
          className="rounded-md bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-[#06131d] disabled:opacity-60"
        >
          {isLoading ? "Explaining..." : "Explain Like I'm 5"}
        </button>
      </div>

      {isLoading && !result && <Spinner label="Thinking (AI)..." />}

      {error && (
        <div className="rounded-md border border-[var(--danger)] bg-[#2b1316] p-3 text-xs text-[#fecaca]">
          {error}
        </div>
      )}

      {result && !isLoading && (
        <div className="space-y-3">
          <div className="rounded-md border bg-[var(--surface-alt)] p-3">
            <div className="text-xs font-semibold text-[var(--foreground)]">
              Simple explanation
            </div>
            <p className="mt-1 text-xs text-[var(--muted)]">{result.simpleExplanation}</p>
          </div>

          <div className="rounded-md border bg-[var(--surface-alt)] p-3">
            <div className="text-xs font-semibold text-[var(--foreground)]">
              Step-by-step breakdown
            </div>
            <ol className="mt-2 space-y-1 text-xs text-[var(--muted)]">
              {result.stepByStep.map((step, idx) => (
                <li key={`${idx}-${step}`}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-md border bg-[var(--surface-alt)] p-3">
              <div className="text-xs font-semibold text-[var(--foreground)]">
                Example input
              </div>
              <pre className="mt-2 whitespace-pre-wrap text-xs text-[var(--muted)]">
                {result.exampleInputOutput.input}
              </pre>
            </div>
            <div className="rounded-md border bg-[var(--surface-alt)] p-3">
              <div className="text-xs font-semibold text-[var(--foreground)]">
                Example output
              </div>
              <pre className="mt-2 whitespace-pre-wrap text-xs text-[var(--muted)]">
                {result.exampleInputOutput.output}
              </pre>
            </div>
          </div>
        </div>
      )}

      {!result && !isLoading && !error && (
        <div className="rounded-md border bg-[var(--surface-alt)] p-3 text-xs text-[var(--muted)]">
          Click the button to get an easy explanation, steps, and a quick example.
        </div>
      )}
    </Card>
  );
}

