import { LearningTopic } from "@/types/dsa";

export const learningPath: LearningTopic[] = [
  {
    id: "arrays",
    title: "Arrays",
    order: 1,
    description: "Foundations: indexed storage, traversal, and pair logic.",
    problemId: "arrays-two-sum-two-pointers",
  },
  {
    id: "two-pointers",
    title: "Two Pointers",
    order: 2,
    description: "Learn pointer movement strategy and invariant thinking.",
    problemId: "two-pointers-container",
  },
  {
    id: "stack",
    title: "Stack",
    order: 3,
    description: "Understand LIFO intuition for parsing and validation tasks.",
    problemId: "stack-valid-parentheses",
  },
  {
    id: "binary-search",
    title: "Binary Search",
    order: 4,
    description: "Master divide-and-conquer search on sorted structures.",
    problemId: "binary-search-classic",
  },
];
