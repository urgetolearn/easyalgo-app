"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/concepts", label: "Concepts" },
  { href: "/paths", label: "Paths" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1 p-3">
      {nav.map((item) => {
        const active =
          item.href === "/concepts"
            ? pathname.startsWith("/concepts")
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "rounded-lg px-3 py-2.5 text-sm font-medium transition",
              active
                ? "bg-[#152030] text-[var(--accent)]"
                : "text-[var(--muted)] hover:bg-[#161e2b] hover:text-[var(--foreground)]"
            )}
          >
            {item.label}
          </Link>
        );
      })}
      <div className="my-2 border-t border-[var(--border)]" />
      <Link
        href="/practice"
        onClick={onNavigate}
        className="rounded-lg px-3 py-2.5 text-sm text-[var(--muted)] hover:bg-[#161e2b] hover:text-[var(--foreground)]"
      >
        Classic practice
      </Link>
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--surface)] md:flex">
        <div className="border-b border-[var(--border)] p-4">
          <Link href="/" className="block">
            <span className="text-lg font-bold tracking-tight text-[var(--foreground)]">
              Easy<span className="text-[var(--accent)]">Algo</span>
            </span>
            <p className="mt-1 text-xs text-[var(--muted)]">Structured DSA mastery</p>
          </Link>
        </div>
        <NavLinks />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/95 px-4 py-3 backdrop-blur md:hidden">
          <Link href="/" className="text-base font-bold">
            Easy<span className="text-[var(--accent)]">Algo</span>
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-label="Open menu"
            className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
            onClick={() => setOpen((o) => !o)}
          >
            Menu
          </button>
        </header>

        {open && (
          <div className="fixed inset-0 z-40 md:hidden">
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/60"
              onClick={() => setOpen(false)}
            />
            <div className="absolute right-0 top-0 flex h-full w-[min(280px,88vw)] flex-col border-l border-[var(--border)] bg-[var(--surface)] shadow-xl">
              <div className="flex items-center justify-between border-b border-[var(--border)] p-4">
                <span className="font-semibold">Navigate</span>
                <button
                  type="button"
                  className="text-sm text-[var(--muted)]"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
              <NavLinks onNavigate={() => setOpen(false)} />
            </div>
          </div>
        )}

        <main className="flex-1 p-4 md:p-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
