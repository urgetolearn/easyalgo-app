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
import { TopicKey } from "@/types/dsa";

function EasyAlgoInner() {
  const [selectedTopic, setSelectedTopic] = useState<TopicKey>("arrays");
  const game = useGame();

  const selectedPathItem = learningPath.find((topic) => topic.id === selectedTopic);
  const selectedProblem = selectedPathItem
    ? getProblemById(selectedPathItem.problemId)
    : undefined;

  const selectedCards = useMemo(
    () => flashcards.filter((card) => card.topic === selectedTopic),
    [selectedTopic]
  );

  const completedTopics = useMemo(() => {
    return learningPath
      .filter((topic) =>
        game.completedChallenges.some((challengeId) =>
          challengeId.startsWith(topic.problemId)
        )
      )
      .map((topic) => topic.id);
  }, [game.completedChallenges]);

  const progressPercent = (completedTopics.length / learningPath.length) * 100;

  if (!selectedProblem) {
    return null;
  }

  return (
    <main className="min-h-screen p-4 md:p-6">
      <div className="mx-auto grid w-full max-w-7xl gap-4">
        <header className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h1 className="text-xl font-semibold">EasyAlgo</h1>
            <p className="text-sm text-[var(--muted)]">
              Duolingo-style DSA learning focused on intuition.
            </p>
          </div>
          <span className="rounded-md border px-3 py-1 text-xs text-[var(--muted)]">
            Topic: {selectedPathItem?.title}
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
            selectedTopic={selectedTopic}
            completedTopics={completedTopics}
            onSelectTopic={setSelectedTopic}
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
