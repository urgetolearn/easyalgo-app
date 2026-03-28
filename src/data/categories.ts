import type { CategoryId } from "@/types/dsa";

export interface ConceptCategory {
  slug: CategoryId;
  title: string;
  tagline: string;
  icon: string;
}

export const CONCEPT_CATEGORIES: ConceptCategory[] = [
  {
    slug: "arrays",
    title: "Arrays",
    tagline: "Indexing, traversal, two pointers, and subarrays.",
    icon: "▦",
  },
  {
    slug: "strings",
    title: "Strings",
    tagline: "Parsing, stacks on characters, and frequency maps.",
    icon: "Aa",
  },
  {
    slug: "recursion",
    title: "Recursion",
    tagline: "Base cases, recursive leaps of faith, and call stacks.",
    icon: "↻",
  },
  {
    slug: "sorting",
    title: "Sorting",
    tagline: "Ordering data: swaps, merges, and divide-and-conquer.",
    icon: "⇅",
  },
  {
    slug: "searching",
    title: "Searching",
    tagline: "Binary search and variants on sorted or answer spaces.",
    icon: "⌕",
  },
  {
    slug: "trees",
    title: "Trees",
    tagline: "Hierarchies, DFS/BFS, and structural recursion.",
    icon: "🌳",
  },
  {
    slug: "graphs",
    title: "Graphs",
    tagline: "Grids, adjacency, cycles, and connectivity.",
    icon: "⬡",
  },
  {
    slug: "dynamic-programming",
    title: "Dynamic Programming",
    tagline: "Overlapping subproblems and optimal substructure.",
    icon: "◧",
  },
];

export function getCategoryBySlug(slug: string): ConceptCategory | undefined {
  return CONCEPT_CATEGORIES.find((c) => c.slug === slug);
}
