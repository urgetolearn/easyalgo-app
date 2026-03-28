export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

/** Top-level curriculum buckets shown on the Concepts page */
export type CategoryId =
  | "arrays"
  | "strings"
  | "recursion"
  | "sorting"
  | "searching"
  | "trees"
  | "graphs"
  | "dynamic-programming";

/** @deprecated Use CategoryId — kept for gradual migration in comments only */
export type TopicKey = CategoryId;

export type SupportedLanguage = "python" | "cpp" | "java";

export interface FillBlankToken {
  id: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface LanguageTemplate {
  code: string;
  tokens: FillBlankToken[];
}

export interface AlgorithmProblem {
  id: string;
  topic: CategoryId;
  title: string;
  difficulty: Difficulty;
  steps: string[];
  correctOrder: number[];
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  intuition: string;
  languageTemplates: Record<SupportedLanguage, LanguageTemplate>;
  /** Long-form statement for problem pages */
  description?: string;
  exampleInput?: string;
  exampleOutput?: string;
}

export interface Flashcard {
  id: string;
  topic: CategoryId;
  question: string;
  answer: string;
}

export interface LearningTopic {
  id: string;
  title: string;
  order: number;
  description: string;
  problemId: string;
}

export type PathId = "beginner" | "intermediate" | "interview-prep";
