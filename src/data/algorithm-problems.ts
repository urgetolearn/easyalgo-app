import type { AlgorithmProblem, CategoryId } from "@/types/dsa";
import legacyRaw from "@/data/problems.json";
import { extendedAlgorithmProblems } from "@/data/extended-problems";

const LEGACY_TOPIC_MAP: Record<string, CategoryId> = {
  arrays: "arrays",
  "two-pointers": "arrays",
  stack: "strings",
  "binary-search": "searching",
};

function enrichLegacy(p: AlgorithmProblem): AlgorithmProblem {
  const topic = LEGACY_TOPIC_MAP[p.topic as string] ?? (p.topic as CategoryId);
  const base: AlgorithmProblem = { ...p, topic };
  if (base.id === "stack-valid-parentheses") {
    return {
      ...base,
      description:
        "Given a string s containing just '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Brackets must close in correct order.",
      exampleInput: 's = "()[]{}"',
      exampleOutput: "true",
    };
  }
  if (base.id === "arrays-two-sum-two-pointers") {
    return {
      ...base,
      description:
        "Given a sorted array of integers nums and a target, return indices i and j such that nums[i] + nums[j] == target (1-indexed or 0-indexed per your API).",
      exampleInput: "nums = [2,7,11,15], target = 9",
      exampleOutput: "[0, 1]  // nums[0]+nums[1]==9",
    };
  }
  if (base.id === "two-pointers-container") {
    return {
      ...base,
      description:
        "Given n non-negative integers representing heights of vertical lines, find two lines that together with the x-axis form a container that holds the most water.",
      exampleInput: "height = [1,8,6,2,5,4,8,3,7]",
      exampleOutput: "49",
    };
  }
  if (base.id === "binary-search-classic") {
    return {
      ...base,
      description:
        "Given a sorted array nums and a target, return the index of target or -1 if it does not exist.",
      exampleInput: "nums = [-1,0,3,5,9,12], target = 9",
      exampleOutput: "4",
    };
  }
  return base;
}

const legacyProblems: AlgorithmProblem[] = (legacyRaw as AlgorithmProblem[]).map(enrichLegacy);

/** Legacy interactive problems first, then catalog extensions (ids are unique). */
export const algorithmProblems: AlgorithmProblem[] = [
  ...legacyProblems,
  ...extendedAlgorithmProblems,
];
