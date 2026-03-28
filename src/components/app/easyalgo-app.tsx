"use client";

import { useMemo, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { GamificationBar } from "@/components/dashboard/gamification-bar";
import { LearningPath } from "@/components/learning/learning-path";
import { TopicWorkspace } from "@/components/learning/topic-workspace";
import { learningPath } from "@/data/learning-path";
import { flashcards } from "@/data/flashcards";
import { getProblemById } from "@/lib/problem-utils";
import { GameProvider, useGame } from "@/state/game-store";
import Link from "next/link";

function EasyAlgoInner() {
  const [selectedId, setSelectedId] = useState(learningPath[0]?.id ?? "");
  const game = useGame();

  const selectedPathItem = learningPath.find((topic) => topic.id === selectedId);
  const selectedProblem = selectedPathItem
    ? getProblemById(selectedPathItem.problemId)
    : undefined;

  const selectedCards = useMemo(() => {
    if (!selectedProblem) return [];
    return flashcards.filter((card) => card.topic === selectedProblem.topic);
  }, [selectedProblem]);

  const completedClassicSteps = useMemo(() => {
    return learningPath
      .filter((topic) =>
        game.completedChallenges.some((challengeId) =>
          challengeId.startsWith(topic.problemId)
        )
      )
      .map((topic) => topic.id);
  }, [game.completedChallenges]);

  const progressPercent = (completedClassicSteps.length / learningPath.length) * 100;

  if (!selectedProblem || !selectedPathItem) {
    return null;
  }

  return (
    <main className="min-h-screen p-4 md:p-6">
      <div className="mx-auto grid w-full max-w-7xl gap-4">
        <header className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <Link
              href="/dashboard"
              className="mb-2 inline-block text-xs font-medium text-[var(--accent)] hover:underline"
            >
              ← Back to platform
            </Link>
            <h1 className="text-xl font-semibold">Classic practice</h1>
            <p className="text-sm text-[var(--muted)]">
              Gamified drills: ordering steps, fill-in-the-blank, and flashcards.
            </p>
          </div>
          <span className="rounded-md border px-3 py-1 text-xs text-[var(--muted)]">
            Step: {selectedPathItem.title}
          </span>
        </header>

        <GamificationBar
          xp={game.xp}
          level={game.level}
          streak={game.streak}
          progress={progressPercent}
        />

        <div className="grid gap-4 xl:grid-cols-[280px,1fr]">
          <LearningPath
            topics={learningPath}
            selectedId={selectedId}
            completedIds={completedClassicSteps}
            onSelect={setSelectedId}
          />
          <TopicWorkspace
            problem={selectedProblem}
            cards={selectedCards}
            onSuccess={game.completeChallenge}
            onFailure={game.markIncorrect}
          />
        </div>
      </div>
    </main>
  );
}

export function EasyAlgoApp() {
  return (
    <GameProvider>
      <DndProvider backend={HTML5Backend}>
        <EasyAlgoInner />
      </DndProvider>
    </GameProvider>
  );
}
