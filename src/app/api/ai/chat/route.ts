import type { ChatMessage } from "@/types/ai";
import type { AlgorithmProblem } from "@/types/dsa";
import { getProblemById } from "@/lib/problem-utils";
import { callOpenAiChat } from "@/lib/ai/openai-server";
import { chatMock, normalizeChatHistoryForPrompt } from "@/lib/ai/mock-responses";

export const runtime = "nodejs";

function safeGetProblem(problemId: string): AlgorithmProblem {
  const problem = getProblemById(problemId);
  if (!problem) {
    throw new Error(`Unknown problemId: ${problemId}`);
  }
  return problem;
}

function getLastUserMessage(messages: ChatMessage[]): string | null {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.role === "user") return m.content;
  }
  return null;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = (await req.json()) as {
      problemId?: string;
      messages?: ChatMessage[];
    };
    const { problemId, messages } = body;

    if (!problemId) {
      return Response.json({ error: "problemId is required" }, { status: 400 });
    }
    if (!messages || messages.length === 0) {
      return Response.json({ error: "messages is required" }, { status: 400 });
    }

    const problem = safeGetProblem(problemId);
    const apiKey = process.env.OPENAI_API_KEY;

    const lastUser = getLastUserMessage(messages) ?? "";

    if (!apiKey) {
      return Response.json({ mock: true, reply: chatMock(problem, lastUser) });
    }

    const system = [
      "You are an AI tutor for algorithm problems in EasyAlgo.",
      "Answer the user's question using the provided problem context.",
      "Be concise, step-by-step when helpful, and avoid fluff.",
      "If the user asks for code, keep it language-agnostic unless the problem specifies a language template.",
      "Problem:",
      `Title: ${problem.title}`,
      `Difficulty: ${problem.difficulty}`,
      `Intuition: ${problem.intuition}`,
      `Steps: ${problem.steps.join(" | ")}`,
      `Time complexity: ${problem.timeComplexity}`,
      `Space complexity: ${problem.spaceComplexity}`,
    ].join("\n");

    const trimmedHistory = normalizeChatHistoryForPrompt(messages);

    const assistantText = await callOpenAiChat({
      apiKey,
      messages: [{ role: "system", content: system }, ...trimmedHistory],
      temperature: 0.4,
      maxTokens: 550,
    });

    return Response.json({ mock: false, reply: assistantText.trim() });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to generate chat response";
    return Response.json({ error: message }, { status: 500 });
  }
}

