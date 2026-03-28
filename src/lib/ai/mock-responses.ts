import type { AlgorithmProblem } from "@/types/dsa";
import type { ChatMessage, ExplainLikeI5Response } from "@/types/ai";

export function explainLikeI5Mock(problem: AlgorithmProblem): ExplainLikeI5Response {
  return {
    simpleExplanation: `${problem.title} is a smart way to find the answer without checking every possibility. It uses the key idea: ${problem.intuition}`,
    stepByStep: problem.steps.map((s, i) => `${i + 1}. ${s}`),
    exampleInputOutput: {
      input: "Example input (mock): show the key values that the algorithm reads.",
      output: "Example output (mock): the final answer the algorithm returns.",
    },
  };
}

export function chatMock(problem: AlgorithmProblem, question: string): string {
  return [
    `Here’s a doubt-friendly explanation for “${problem.title}”.`,
    "",
    `Big idea: ${problem.intuition}`,
    `Main steps:`,
    ...problem.steps.slice(0, 6).map((s, i) => `- Step ${i + 1}: ${s}`),
    "",
    `About your question: “${question.trim()}”`,
    `In short: focus on why the algorithm moves (or updates pointers/structure) and how that guarantees progress.`,
  ].join("\n");
}

export function normalizeChatHistoryForPrompt(messages: ChatMessage[]): ChatMessage[] {
  // Keep it small to avoid overly long prompts.
  return messages.slice(-16);
}

