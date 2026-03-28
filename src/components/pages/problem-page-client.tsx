"use client";

import { AskDoubtChat } from "@/components/ai/AskDoubtChat";
import { ExplainAlgorithmCard } from "@/components/ai/ExplainAlgorithmCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLearningProgress } from "@/state/learning-progress-store";
import type { AlgorithmProblem } from "@/types/dsa";

export function ProblemPageClient({ problem }: { problem: AlgorithmProblem }) {
  const { markVisit, markCompleted, completedSet, hydrated } = useLearningProgress();
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (!hydrated) return;
    markVisit(problem.id, problem.title);
  }, [hydrated, markVisit, problem.id, problem.title]);

  const completed = completedSet.has(problem.id);
  const description = problem.description ?? problem.explanation;
  const exampleIn = problem.exampleInput ?? "See problem statement in your own words.";
  const exampleOut = problem.exampleOutput ?? "Depends on your implementation.";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href={`/concepts/${problem.topic}`}
            className="text-xs font-medium uppercase tracking-wider text-[var(--accent)] hover:underline"
          >
            {problem.topic.replace(/-/g, " ")}
          </Link>
          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">{problem.title}</h1>
          <p className="mt-2 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
            <span className="rounded-md border border-[var(--border)] px-2 py-0.5">
              {problem.difficulty}
            </span>
            <span>{problem.timeComplexity} time</span>
            <span>{problem.spaceComplexity} space</span>
          </p>
        </div>
        <Button
          variant={completed ? "secondary" : "primary"}
          onClick={() => markCompleted(problem.id, !completed)}
        >
          {completed ? "Completed ✓" : "Mark as completed"}
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="space-y-4 lg:col-span-2">
          <section>
            <h2 className="text-sm font-semibold text-[var(--foreground)]">Description</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{description}</p>
          </section>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-alt)] p-3">
              <div className="text-xs font-semibold text-[var(--foreground)]">Example input</div>
              <pre className="mt-2 whitespace-pre-wrap font-mono text-xs text-[var(--muted)]">
                {exampleIn}
              </pre>
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-alt)] p-3">
              <div className="text-xs font-semibold text-[var(--foreground)]">Example output</div>
              <pre className="mt-2 whitespace-pre-wrap font-mono text-xs text-[var(--muted)]">
                {exampleOut}
              </pre>
            </div>
          </div>
          <section>
            <h2 className="text-sm font-semibold text-[var(--foreground)]">Your code</h2>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="// Use any language you like — this draft stays in the browser only."
              spellCheck={false}
              className="mt-2 min-h-[200px] w-full resize-y rounded-lg border border-[var(--border)] bg-[#0a0f16] p-3 font-mono text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]"
            />
          </section>
        </Card>

        <div className="space-y-4">
          <ExplainAlgorithmCard problem={problem} />
          <AskDoubtChat problem={problem} />
        </div>
      </div>
    </div>
  );
}
