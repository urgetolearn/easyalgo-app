"use client";

import { CONCEPT_CATEGORIES } from "@/data/categories";
import { LEARNING_PATHS } from "@/data/paths";
import { getCategoryProgress, getProblemById } from "@/lib/problem-utils";
import { getContinueProblemId } from "@/lib/learning-progress";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useLearningProgress } from "@/state/learning-progress-store";

export function PlatformDashboard() {
  const { state, completedSet, hydrated } = useLearningProgress();

  if (!hydrated) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-48 rounded bg-[var(--surface-alt)]" />
        <div className="h-32 rounded-xl bg-[var(--surface-alt)]" />
      </div>
    );
  }

  const totalProblems = completedSet.size;
  const continueId = getContinueProblemId(completedSet);
  const continueProblem = continueId ? getProblemById(continueId) : undefined;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Track streaks of finished problems and pick up where you left off.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-[var(--accent)]/30 bg-[#0f1a24]">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            Problems solved
          </p>
          <p className="mt-2 text-3xl font-bold text-[var(--accent)]">{totalProblems}</p>
        </Card>
        <Card>
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            Active path
          </p>
          <p className="mt-2 text-lg font-semibold capitalize">
            {state.activePathId?.replace(/-/g, " ") ?? "—"}
          </p>
          <Link href="/paths" className="mt-2 inline-block text-xs text-[var(--accent)] hover:underline">
            Change path
          </Link>
        </Card>
        <Card className="sm:col-span-2">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            Continue learning
          </p>
          {continueProblem ? (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium">{continueProblem.title}</p>
                <p className="text-xs text-[var(--muted)]">{continueProblem.difficulty}</p>
              </div>
              <ButtonLink href={`/problems/${continueProblem.id}`}>Open problem</ButtonLink>
            </div>
          ) : (
            <p className="mt-2 text-sm text-[var(--muted)]">You&apos;re all caught up in the catalog.</p>
          )}
        </Card>
      </div>

      <section>
        <h2 className="text-lg font-semibold">By category</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CONCEPT_CATEGORIES.map((cat) => {
            const { done, total } = getCategoryProgress(cat.slug, completedSet);
            const pct = total === 0 ? 0 : Math.round((done / total) * 100);
            return (
              <Link key={cat.slug} href={`/concepts/${cat.slug}`}>
                <Card className="h-full transition hover:border-[var(--accent)]/40">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="text-xs text-[var(--muted)]">
                      {done}/{total}
                    </span>
                  </div>
                  <h3 className="mt-2 font-semibold">{cat.title}</h3>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--surface-alt)]">
                    <div
                      className="h-full rounded-full bg-[var(--accent)] transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-[var(--muted)]">{pct}% complete</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Learning paths</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {LEARNING_PATHS.map((path) => {
            const done = path.problemIds.filter((id) => completedSet.has(id)).length;
            const total = path.problemIds.length;
            const pct = Math.round((done / total) * 100);
            return (
              <Link key={path.id} href={`/paths/${path.id}`}>
                <Card className="h-full transition hover:border-[var(--accent)]/40">
                  <h3 className="font-semibold">{path.title}</h3>
                  <p className="mt-1 text-xs text-[var(--muted)]">{path.description.slice(0, 90)}…</p>
                  <p className="mt-3 text-sm font-medium text-[var(--accent)]">
                    {done}/{total} · {pct}%
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Recently visited</h2>
        {state.recentVisits.length === 0 ? (
          <p className="mt-2 text-sm text-[var(--muted)]">Open a problem to build your history.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {state.recentVisits.map((v) => (
              <li key={`${v.id}-${v.at}`}>
                <Link
                  href={`/problems/${v.id}`}
                  className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm transition hover:bg-[#161e2b]"
                >
                  <span>{v.title}</span>
                  <span className="text-xs text-[var(--muted)]">
                    {new Date(v.at).toLocaleDateString()}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
