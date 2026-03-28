import type { PathId } from "@/types/dsa";

export interface LearningPathDefinition {
  id: PathId;
  title: string;
  description: string;
  estimatedHours: string;
  problemIds: readonly string[];
}

export const LEARNING_PATHS: LearningPathDefinition[] = [
  {
    id: "beginner",
    title: "Beginner",
    description:
      "Warm up with core patterns: arrays, strings, search, recursion, trees, and your first DP classic.",
    estimatedHours: "8–12",
    problemIds: [
      "arrays-two-sum-two-pointers",
      "stack-valid-parentheses",
      "binary-search-classic",
      "recursion-factorial",
      "arrays-max-subarray",
      "strings-reverse-words",
      "sorting-bubble-concept",
      "searching-first-bad-version",
      "trees-max-depth",
      "dp-climbing-stairs",
    ],
  },
  {
    id: "intermediate",
    title: "Intermediate",
    description:
      "Mix two pointers, graphs, sorting insights, and multi-step DP — closer to real interview pacing.",
    estimatedHours: "15–20",
    problemIds: [
      "two-pointers-container",
      "strings-valid-anagram",
      "sorting-merge-overview",
      "trees-invert-binary-tree",
      "graphs-num-islands",
      "recursion-fibonacci",
      "dp-house-robber",
      "strings-longest-substring-no-repeat",
      "graphs-course-schedule",
      "dp-coin-change",
    ],
  },
  {
    id: "interview-prep",
    title: "Interview Prep",
    description:
      "High-signal problems that show up often: intervals, grids, scheduling, and knapsack-style DP.",
    estimatedHours: "25–35",
    problemIds: [
      "strings-longest-substring-no-repeat",
      "two-pointers-container",
      "graphs-num-islands",
      "dp-coin-change",
      "graphs-course-schedule",
      "dp-house-robber",
      "arrays-max-subarray",
      "trees-max-depth",
      "stack-valid-parentheses",
      "binary-search-classic",
    ],
  },
];

export function getPathById(id: string): LearningPathDefinition | undefined {
  return LEARNING_PATHS.find((p) => p.id === id);
}
