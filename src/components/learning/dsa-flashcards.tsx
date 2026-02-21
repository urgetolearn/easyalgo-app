"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Flashcard } from "@/types/dsa";

interface DSAFlashcardsProps {
  cards: Flashcard[];
  onKnown: () => void;
}

export function DSAFlashcards({ cards, onKnown }: DSAFlashcardsProps) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownIds, setKnownIds] = useState<string[]>([]);
  const current = cards[index];

  const knownCount = useMemo(() => knownIds.length, [knownIds]);

  if (!current) {
    return (
      <Card>
        <p className="text-sm text-[var(--muted)]">No flashcards for this topic yet.</p>
      </Card>
    );
  }

  const markCard = (isKnown: boolean) => {
    if (isKnown && !knownIds.includes(current.id)) {
      setKnownIds((existing) => [...existing, current.id]);
      onKnown();
    }
    setFlipped(false);
    setIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">DSA Flashcards</h3>
        <span className="text-xs text-[var(--muted)]">{`${knownCount}/${cards.length} known`}</span>
      </div>
      <button
        type="button"
        onClick={() => setFlipped((prev) => !prev)}
        className="h-44 w-full rounded-xl border bg-[#111a27] p-4 text-left transition [transform-style:preserve-3d] hover:bg-[#152132]"
      >
        <p className="mb-2 text-xs uppercase tracking-wide text-[var(--muted)]">
          {flipped ? "Explanation" : "Question"}
        </p>
        <p className="text-sm leading-6">{flipped ? current.answer : current.question}</p>
      </button>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => markCard(true)}
          className="rounded-md bg-[#1f8f59] px-3 py-2 text-xs font-semibold"
        >
          I Know This
        </button>
        <button
          type="button"
          onClick={() => markCard(false)}
          className="rounded-md border px-3 py-2 text-xs"
        >
          Review Again
        </button>
      </div>
      <p className="text-xs text-[var(--muted)]">
        Spaced repetition: placeholder ready for scheduling intervals later.
      </p>
    </Card>
  );
}
