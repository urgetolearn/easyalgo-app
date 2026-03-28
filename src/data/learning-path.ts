import { LearningTopic } from "@/types/dsa";

/** Linear steps for the legacy drag-and-drop / flashcard workspace at `/practice`. */
export const learningPath: LearningTopic[] = [
  {
    id: "classic-1",
    title: "Arrays · Two pointers",
    order: 1,
    description: "Sorted pair sum with two moving pointers.",
    problemId: "arrays-two-sum-two-pointers",
  },
  {
    id: "classic-2",
    title: "Arrays · Container",
    order: 2,
    description: "Area maximization from both ends.",
    problemId: "two-pointers-container",
  },
  {
    id: "classic-3",
    title: "Strings · Stack",
    order: 3,
    description: "Match brackets with a LIFO structure.",
    problemId: "stack-valid-parentheses",
  },
  {
    id: "classic-4",
    title: "Searching · Binary search",
    order: 4,
    description: "Halve the search space each step.",
    problemId: "binary-search-classic",
  },
];
