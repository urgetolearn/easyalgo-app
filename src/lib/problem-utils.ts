import { algorithmProblems } from "@/data/algorithm-problems";
import type { AlgorithmProblem, CategoryId } from "@/types/dsa";

export { algorithmProblems };

export const getProblemById = (id: string): AlgorithmProblem | undefined =>
  algorithmProblems.find((problem) => problem.id === id);

export const getProblemsByCategory = (category: CategoryId): AlgorithmProblem[] =>
  algorithmProblems.filter((p) => p.topic === category);

export function getCategoryProgress(
  category: CategoryId,
  completedIds: Set<string>
): { done: number; total: number } {
  const total = algorithmProblems.filter((p) => p.topic === category).length;
  const done = algorithmProblems.filter(
    (p) => p.topic === category && completedIds.has(p.id)
  ).length;
  return { done, total };
}
