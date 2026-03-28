import type { AlgorithmProblem } from "@/types/dsa";
import type { ExplainLikeI5Response } from "@/types/ai";
import { getProblemById } from "@/lib/problem-utils";
import { callOpenAiChat } from "@/lib/ai/openai-server";
import { explainLikeI5Mock } from "@/lib/ai/mock-responses";

export const runtime = "nodejs";

function extractJson(text: string): unknown {
  // Handle cases where the model returns fenced JSON.
  const trimmed = text.trim();
  const withoutFence = trimmed
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  return JSON.parse(withoutFence);
}

function safeGetProblem(problemId: string): AlgorithmProblem {
  const problem = getProblemById(problemId);
  if (!problem) {
    throw new Error(`Unknown problemId: ${problemId}`);
  }
  return problem;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = (await req.json()) as { problemId?: string };
    const { problemId } = body;

    if (!problemId) {
      return Response.json({ error: "problemId is required" }, { status: 400 });
    }

    const problem = safeGetProblem(problemId);

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return Response.json({ mock: true, ...explainLikeI5Mock(problem) });
    }

    const system = [
      "You are a patient algorithm tutor.",
      "Explain the algorithm like I'm 5, but keep it accurate.",
      "Return ONLY valid JSON with keys:",
      "`simpleExplanation` (string),",
      "`stepByStep` (array of strings),",
      "`exampleInputOutput` (object with `input` and `output` strings).",
      "Do not include any extra keys or markdown fences.",
    ].join("\n");

    const user = [
      `Problem: ${problem.title}`,
      `Difficulty: ${problem.difficulty}`,
      `Key intuition: ${problem.intuition}`,
      `How it works (steps):`,
      ...problem.steps.map((s, i) => `${i + 1}. ${s}`),
      "",
      "Now produce the explanation in the required JSON format.",
    ].join("\n");

    const content = await callOpenAiChat({
      apiKey,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.2,
      maxTokens: 650,
    });

    let parsed: ExplainLikeI5Response;
    try {
      parsed = extractJson(content) as ExplainLikeI5Response;
    } catch {
      // If JSON parsing fails, fall back to a mock-like response.
      parsed = explainLikeI5Mock(problem);
    }

    return Response.json({ mock: false, ...parsed });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to generate explanation";
    return Response.json({ error: message }, { status: 500 });
  }
}

