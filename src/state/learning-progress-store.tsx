"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultProgressState,
  parseProgressState,
  PROGRESS_STORAGE_KEY,
  recordVisit,
  serializeProgressState,
  setCompleted,
  type LearningProgressState,
} from "@/lib/learning-progress";
import type { PathId } from "@/types/dsa";

type LearningProgressContextValue = {
  state: LearningProgressState;
  hydrated: boolean;
  completedSet: Set<string>;
  markVisit: (problemId: string, title: string) => void;
  markCompleted: (problemId: string, completed: boolean) => void;
  setActivePathId: (pathId: PathId | null) => void;
};

const LearningProgressContext = createContext<LearningProgressContextValue | undefined>(
  undefined
);

export function LearningProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LearningProgressState>(defaultProgressState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(parseProgressState(localStorage.getItem(PROGRESS_STORAGE_KEY)));
    setHydrated(true);
  }, []);

  const persist = useCallback((updater: (s: LearningProgressState) => LearningProgressState) => {
    setState((current) => {
      const next = updater(current);
      if (typeof window !== "undefined") {
        localStorage.setItem(PROGRESS_STORAGE_KEY, serializeProgressState(next));
      }
      return next;
    });
  }, []);

  const markVisit = useCallback(
    (problemId: string, title: string) => {
      persist((s) => recordVisit(s, problemId, title));
    },
    [persist]
  );

  const markCompleted = useCallback(
    (problemId: string, completed: boolean) => {
      persist((s) => setCompleted(s, problemId, completed));
    },
    [persist]
  );

  const setActivePathId = useCallback(
    (pathId: PathId | null) => {
      persist((s) => ({ ...s, activePathId: pathId }));
    },
    [persist]
  );

  const completedSet = useMemo(() => new Set(state.completedIds), [state.completedIds]);

  const value = useMemo(
    () => ({
      state,
      hydrated,
      completedSet,
      markVisit,
      markCompleted,
      setActivePathId,
    }),
    [state, hydrated, completedSet, markVisit, markCompleted, setActivePathId]
  );

  return (
    <LearningProgressContext.Provider value={value}>{children}</LearningProgressContext.Provider>
  );
}

export function useLearningProgress() {
  const ctx = useContext(LearningProgressContext);
  if (!ctx) {
    throw new Error("useLearningProgress must be used within LearningProgressProvider");
  }
  return ctx;
}
