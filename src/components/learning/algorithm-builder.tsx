"use client";

import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Card } from "@/components/ui/card";
import { AlgorithmProblem } from "@/types/dsa";

const ITEM_TYPE = "ALGO_STEP";

interface BuilderStep {
  id: string;
  label: string;
  originalIndex: number;
}

interface DraggableStepProps {
  step: BuilderStep;
  index: number;
  moveStep: (dragIndex: number, hoverIndex: number) => void;
}

function DraggableStep({ step, index, moveStep }: DraggableStepProps) {
  const [, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { index },
  }));

  const [, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveStep(item.index, index);
        item.index = index;
      }
    },
  }));

  return (
    <div
      ref={(node) => {
        drag(drop(node));
      }}
      className="cursor-grab rounded-lg border bg-[#141c28] p-3 text-sm active:cursor-grabbing"
    >
      {step.label}
    </div>
  );
}

interface AlgorithmBuilderProps {
  challenge: AlgorithmProblem;
  onSolved: () => void;
  onFailed: () => void;
}

export function AlgorithmBuilder({
  challenge,
  onSolved,
  onFailed,
}: AlgorithmBuilderProps) {
  const createInitialSteps = () =>
    challenge.steps
      .map((label, index) => ({
        label,
        originalIndex: index,
        id: `${challenge.id}-${index}`,
      }))
      .reverse();

  const [steps, setSteps] = useState<BuilderStep[]>(() => createInitialSteps());
  const [result, setResult] = useState<"idle" | "success" | "error">("idle");

  const moveStep = (dragIndex: number, hoverIndex: number) => {
    setSteps((current) => {
      const next = [...current];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(hoverIndex, 0, moved);
      return next;
    });
  };

  const validateOrder = () => {
    const orderedIndexes = steps.map((step) => step.originalIndex);
    const solved = orderedIndexes.every(
      (value, index) => value === challenge.correctOrder[index]
    );
    setResult(solved ? "success" : "error");
    if (solved) {
      onSolved();
      return;
    }
    onFailed();
  };

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Drag-and-Drop Builder</h3>
        <span className="text-xs text-[var(--muted)]">{challenge.difficulty}</span>
      </div>
      <p className="text-xs text-[var(--muted)]">
        Arrange the algorithm logic in the correct sequence.
      </p>
      <div className="space-y-2">
        {steps.map((step, index) => (
          <DraggableStep key={step.id} step={step} index={index} moveStep={moveStep} />
        ))}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={validateOrder}
          className="rounded-md bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-[#06131d]"
        >
          Check Sequence
        </button>
        <button
          type="button"
          onClick={() => {
            setSteps(createInitialSteps());
            setResult("idle");
          }}
          className="rounded-md border px-3 py-2 text-xs"
        >
          Shuffle
        </button>
      </div>
      {result === "success" && (
        <div className="rounded-md border border-[var(--success)] bg-[#0f2617] p-3 text-xs text-[var(--success)] animate-pulse">
          Correct order. Great logic flow.
        </div>
      )}
      {result === "error" && (
        <div className="rounded-md border border-[var(--danger)] bg-[#2b1316] p-3 text-xs text-[#fecaca]">
          Not quite. {challenge.explanation}
        </div>
      )}
    </Card>
  );
}
