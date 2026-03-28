import { LEARNING_PATHS } from "@/data/paths";
import { algorithmProblems } from "@/lib/problem-utils";
import type { PathId } from "@/types/dsa";

export const PROGRESS_STORAGE_KEY = "easyalgo-learning-progress-v1";

export type RecentVisit = {
  id: string;
  title: string;
  at: number;
};

export type LearningProgressState = {
  completedIds: string[];
  recentVisits: RecentVisit[];
  activePathId: PathId | null;
};

export const defaultProgressState: LearningProgressState = {
  completedIds: [],
  recentVisits: [],
  activePathId: "beginner",
};

export function parseProgressState(raw: string | null): LearningProgressState {
  if (!raw) return { ...defaultProgressState };
  try {
    const data = JSON.parse(raw) as Partial<LearningProgressState>;
    return {
      completedIds: Array.isArray(data.completedIds) ? data.completedIds : [],
      recentVisits: Array.isArray(data.recentVisits) ? data.recentVisits : [],
      activePathId:
        data.activePathId === "beginner" ||
        data.activePathId === "intermediate" ||
        data.activePathId === "interview-prep"
          ? data.activePathId
          : defaultProgressState.activePathId,
    };
  } catch {
    return { ...defaultProgressState };
  }
}

export function serializeProgressState(state: LearningProgressState): string {
  return JSON.stringify(state);
}

const MAX_RECENT = 12;

export function recordVisit(
  state: LearningProgressState,
  problemId: string,
  title: string
): LearningProgressState {
  const rest = state.recentVisits.filter((v) => v.id !== problemId);
  const nextRecent: RecentVisit[] = [
    { id: problemId, title, at: Date.now() },
    ...rest,
  ].slice(0, MAX_RECENT);
  return { ...state, recentVisits: nextRecent };
}

export function toggleCompleted(
  state: LearningProgressState,
  problemId: string
): LearningProgressState {
  const set = new Set(state.completedIds);
  if (set.has(problemId)) set.delete(problemId);
  else set.add(problemId);
  return { ...state, completedIds: [...set] };
}

export function setCompleted(
  state: LearningProgressState,
  problemId: string,
  completed: boolean
): LearningProgressState {
  const set = new Set(state.completedIds);
  if (completed) set.add(problemId);
  else set.delete(problemId);
  return { ...state, completedIds: [...set] };
}

export function getNextProblemInPath(
  pathId: PathId | null,
  completedIds: Set<string>
): string | null {
  if (!pathId) return null;
  const path = LEARNING_PATHS.find((p) => p.id === pathId);
  if (!path) return null;
  return path.problemIds.find((id) => !completedIds.has(id)) ?? null;
}

/** First incomplete problem in beginner path, else first incomplete in full catalog. */
export function getContinueProblemId(completedIds: Set<string>): string | null {
  const beginner = LEARNING_PATHS.find((p) => p.id === "beginner");
  if (beginner) {
    const next = beginner.problemIds.find((id) => !completedIds.has(id));
    if (next) return next;
  }
  return algorithmProblems.find((p) => !completedIds.has(p.id))?.id ?? null;
}
