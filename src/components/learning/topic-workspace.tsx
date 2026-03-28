"use client";

import { DSAFlashcards } from "@/components/learning/dsa-flashcards";
import { AlgorithmBuilder } from "@/components/learning/algorithm-builder";
import { FillBlankCode } from "@/components/learning/fill-blank-code";
import { VisualExplanationPanel } from "@/components/learning/visual-explanation-panel";
import { Flashcard, AlgorithmProblem } from "@/types/dsa";
import { ExplainAlgorithmCard } from "@/components/ai/ExplainAlgorithmCard";
import { AskDoubtChat } from "@/components/ai/AskDoubtChat";

interface TopicWorkspaceProps {
  problem: AlgorithmProblem;
  cards: Flashcard[];
  onSuccess: (challengeId: string, xp: number) => void;
  onFailure: () => void;
}

export function TopicWorkspace({
  problem,
  cards,
  onSuccess,
  onFailure,
}: TopicWorkspaceProps) {
  return (
    <div className="grid gap-4">
      <ExplainAlgorithmCard key={problem.id} problem={problem} />
      <div className="grid gap-4 xl:grid-cols-2">
        <AlgorithmBuilder
          key={`${problem.id}-builder`}
          challenge={problem}
          onSolved={() => onSuccess(`${problem.id}-builder`, 30)}
          onFailed={onFailure}
        />
        <FillBlankCode
          key={`${problem.id}-fill`}
          challenge={problem}
          onSolved={() => onSuccess(`${problem.id}-fill`, 25)}
          onFailed={onFailure}
        />
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <DSAFlashcards
          key={`${problem.id}-flash`}
          cards={cards}
          onKnown={() => onSuccess(`${problem.id}-flash`, 10)}
        />
        <div className="grid gap-4">
          <VisualExplanationPanel challenge={problem} />
          <AskDoubtChat key={problem.id} problem={problem} />
        </div>
      </div>
    </div>
  );
}
