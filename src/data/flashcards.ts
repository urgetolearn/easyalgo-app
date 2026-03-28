import { Flashcard } from "@/types/dsa";

export const flashcards: Flashcard[] = [
  {
    id: "f1",
    topic: "arrays",
    question: "What is time complexity?",
    answer:
      "Time complexity describes how runtime grows as input size grows, usually with Big-O notation.",
  },
  {
    id: "f2",
    topic: "arrays",
    question: "Why are arrays good for random access?",
    answer: "Array elements are stored contiguously, so index lookup is O(1).",
  },
  {
    id: "f3",
    topic: "arrays",
    question: "When should you consider two pointers?",
    answer:
      "Use two pointers when data is ordered or when scanning from both ends can reduce brute-force checks.",
  },
  {
    id: "f4",
    topic: "strings",
    question: "What is stack order?",
    answer: "LIFO: Last In, First Out. The latest pushed item is popped first.",
  },
  {
    id: "f5",
    topic: "strings",
    question: "Typical stack operations complexity?",
    answer: "Push, pop, and peek are all O(1).",
  },
  {
    id: "f6",
    topic: "searching",
    question: "Why is binary search O(log n)?",
    answer: "Each step discards half of the remaining search space.",
  },
  {
    id: "f7",
    topic: "searching",
    question: "Key requirement for binary search?",
    answer: "The search space must be monotonic so you can discard half safely (often a sorted array).",
  },
];
