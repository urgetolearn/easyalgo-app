export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type TopicKey = "arrays" | "two-pointers" | "stack" | "binary-search";
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
  topic: TopicKey;
  title: string;
  difficulty: Difficulty;
  steps: string[];
  correctOrder: number[];
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  intuition: string;
  languageTemplates: Record<SupportedLanguage, LanguageTemplate>;
}

export interface Flashcard {
  id: string;
  topic: TopicKey;
  question: string;
  answer: string;
}

export interface LearningTopic {
  id: TopicKey;
  title: string;
  order: number;
  description: string;
  problemId: string;
}
