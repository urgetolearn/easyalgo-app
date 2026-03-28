import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--border)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
          <span className="text-lg font-bold">
            Easy<span className="text-[var(--accent)]">Algo</span>
          </span>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/concepts" className="text-[var(--muted)] hover:text-[var(--foreground)]">
              Concepts
            </Link>
            <Link href="/paths" className="text-[var(--muted)] hover:text-[var(--foreground)]">
              Paths
            </Link>
            <Link href="/dashboard" className="text-[var(--muted)] hover:text-[var(--foreground)]">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
          Learn DSA like a product
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          A structured path from arrays to dynamic programming — with AI that explains and answers doubts.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--muted)]">
          Work through concepts, curated interview-style sequences, and a dashboard that remembers what
          you&apos;ve finished. No accounts required — progress stays in your browser.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/dashboard">Open dashboard</ButtonLink>
          <ButtonLink href="/concepts" variant="secondary">
            Browse concepts
          </ButtonLink>
          <ButtonLink href="/paths" variant="secondary">
            View paths
          </ButtonLink>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          <Card>
            <h2 className="text-sm font-semibold text-[var(--accent)]">Concepts</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Eight core areas — each with multiple problems, examples, and a focused problem page.
            </p>
          </Card>
          <Card>
            <h2 className="text-sm font-semibold text-[var(--accent)]">Paths</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Beginner, intermediate, and interview prep tracks that chain problems across topics.
            </p>
          </Card>
          <Card>
            <h2 className="text-sm font-semibold text-[var(--accent)]">Classic mode</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Prefer drag-and-drop and fill-in-the-blank?{" "}
              <Link href="/practice" className="text-[var(--accent)] hover:underline">
                Open classic practice
              </Link>
              .
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
