import { LEARNING_PATHS } from "@/data/paths";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning paths · EasyAlgo",
  description: "Beginner, intermediate, and interview-focused problem sequences.",
};

export default function PathsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Learning paths</h1>
        <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">
          Follow a curated sequence like a course — each path strings together problems across categories so
          you build momentum without deciding what to do next.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {LEARNING_PATHS.map((path) => (
          <Link key={path.id} href={`/paths/${path.id}`}>
            <Card className="flex h-full flex-col transition hover:border-[var(--accent)]/45">
              <h2 className="text-lg font-semibold">{path.title}</h2>
              <p className="mt-2 flex-1 text-sm text-[var(--muted)]">{path.description}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border)] pt-4 text-xs text-[var(--muted)]">
                <span>~{path.estimatedHours} hours</span>
                <span>{path.problemIds.length} problems</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
