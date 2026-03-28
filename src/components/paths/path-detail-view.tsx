"use client";

import type { LearningPathDefinition } from "@/data/paths";
import { getProblemById } from "@/lib/problem-utils";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useEffect } from "react";
import { useLearningProgress } from "@/state/learning-progress-store";
import type { PathId } from "@/types/dsa";

export function PathDetailView({ path }: { path: LearningPathDefinition }) {
  const { completedSet, setActivePathId, hydrated } = useLearningProgress();

  useEffect(() => {
    if (!hydrated) return;
    setActivePathId(path.id as PathId);
  }, [hydrated, path.id, setActivePathId]);

  const done = path.problemIds.filter((id) => completedSet.has(id)).length;
  const total = path.problemIds.length;

  return (
    <div className="space-y-8">
      <div>
        <Link href="/paths" className="text-sm text-[var(--accent)] hover:underline">
          ← All paths
        </Link>
        <h1 className="mt-2 text-2xl font-bold md:text-3xl">{path.title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">{path.description}</p>
        <p className="mt-3 text-xs text-[var(--muted)]">
          ~{path.estimatedHours} hrs · {done}/{total} problems checked off
        </p>
      </div>

      <div className="space-y-3">
        {path.problemIds.map((id, index) => {
          const p = getProblemById(id);
          if (!p) return null;
          const solved = completedSet.has(id);
          return (
            <Card
              key={id}
              className={`flex flex-wrap items-center justify-between gap-3 ${
                solved ? "border-[var(--success)]/40 bg-[#0f1a14]" : ""
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] text-sm font-semibold text-[var(--muted)]">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <p className="font-medium">{p.title}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {p.topic} · {p.difficulty}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {solved && (
                  <span className="rounded-md border border-[var(--success)]/50 px-2 py-1 text-xs text-[var(--success)]">
                    Done
                  </span>
                )}
                <ButtonLink href={`/problems/${p.id}`} variant="secondary">
                  Open
                </ButtonLink>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
