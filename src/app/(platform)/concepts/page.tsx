import { CONCEPT_CATEGORIES } from "@/data/categories";
import { getProblemsByCategory } from "@/lib/problem-utils";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concepts · EasyAlgo",
  description: "Browse DSA topics from arrays to dynamic programming.",
};

export default function ConceptsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Concepts</h1>
        <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">
          Each category groups curated problems with explanations, examples, and AI help — similar to how
          interview platforms organize their curriculum.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {CONCEPT_CATEGORIES.map((cat) => {
          const problems = getProblemsByCategory(cat.slug);
          return (
            <Link key={cat.slug} href={`/concepts/${cat.slug}`}>
              <Card className="h-full transition hover:border-[var(--accent)]/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-3xl leading-none">{cat.icon}</span>
                  <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted)]">
                    {problems.length} problems
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-semibold">{cat.title}</h2>
                <p className="mt-2 text-sm text-[var(--muted)]">{cat.tagline}</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
