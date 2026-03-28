import { getCategoryBySlug } from "@/data/categories";
import { getProblemsByCategory } from "@/lib/problem-utils";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  return {
    title: cat ? `${cat.title} · EasyAlgo` : "Concept · EasyAlgo",
  };
}

export default async function ConceptDetailPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const problems = getProblemsByCategory(category.slug);

  return (
    <div className="space-y-8">
      <div>
        <Link href="/concepts" className="text-sm text-[var(--accent)] hover:underline">
          ← All concepts
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className="text-4xl">{category.icon}</span>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">{category.title}</h1>
            <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">{category.tagline}</p>
          </div>
        </div>
      </div>

      {problems.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">Problems for this topic are coming soon.</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {problems.map((p) => (
            <Link key={p.id} href={`/problems/${p.id}`}>
              <Card className="h-full transition hover:border-[var(--accent)]/40">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-semibold leading-snug">{p.title}</h2>
                  <span className="shrink-0 rounded-md border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted)]">
                    {p.difficulty}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-xs text-[var(--muted)]">
                  {p.description ?? p.intuition}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
