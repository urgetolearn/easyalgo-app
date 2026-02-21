"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { AlgorithmProblem, SupportedLanguage } from "@/types/dsa";

interface FillBlankCodeProps {
  challenge: AlgorithmProblem;
  onSolved: () => void;
  onFailed: () => void;
}

export function FillBlankCode({ challenge, onSolved, onFailed }: FillBlankCodeProps) {
  const [language, setLanguage] = useState<SupportedLanguage>("python");
  const template = challenge.languageTemplates[language];
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<"idle" | "success" | "error">("idle");

  const solved = useMemo(
    () =>
      template.tokens.every(
        (_, idx) => answers[idx] && answers[idx] === template.tokens[idx].answer
      ),
    [answers, template]
  );

  const evaluate = () => {
    if (template.tokens.some((_, idx) => !answers[idx])) {
      setResult("error");
      onFailed();
      return;
    }
    setResult(solved ? "success" : "error");
    if (solved) {
      onSolved();
      return;
    }
    onFailed();
  };

  const renderCode = () => {
    const parts = template.code.split(/(__\d+__)/g);
    return parts.map((part, index) => {
      const match = part.match(/__([0-9]+)__/);
      if (!match) {
        return <span key={`${part}-${index}`}>{part}</span>;
      }
      const tokenIndex = Number(match[1]);
      const token = template.tokens[tokenIndex];
      return (
        <select
          key={`${token.id}-${index}`}
          value={answers[tokenIndex] ?? ""}
          onChange={(event) =>
            setAnswers((current) => ({ ...current, [tokenIndex]: event.target.value }))
          }
          className="mx-1 rounded border bg-[#0f1520] px-2 py-1 text-xs text-[var(--foreground)]"
        >
          <option value="">___</option>
          {token.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    });
  };

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Fill-in-the-Blank Code</h3>
        <div className="flex gap-1 rounded-md border p-1">
          {(["python", "cpp", "java"] as SupportedLanguage[]).map((lang) => (
            <button
              type="button"
              key={lang}
              onClick={() => {
                setLanguage(lang);
                setAnswers({});
                setResult("idle");
              }}
              className={`rounded px-2 py-1 text-xs ${
                language === lang ? "bg-[#223047]" : "text-[var(--muted)]"
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <pre className="overflow-auto rounded-lg border bg-[#0d131d] p-3 text-xs leading-6 whitespace-pre-wrap">
        <code>{renderCode()}</code>
      </pre>
      <button
        type="button"
        onClick={evaluate}
        className="rounded-md bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-[#06131d]"
      >
        Validate Tokens
      </button>
      {result !== "idle" && (
        <div
          className={`rounded-md border p-3 text-xs ${
            result === "success"
              ? "border-[var(--success)] bg-[#0f2617] text-[var(--success)]"
              : "border-[var(--danger)] bg-[#2b1316] text-[#fecaca]"
          }`}
        >
          {result === "success"
            ? "Correct tokens selected."
            : "Some tokens are incorrect or missing."}
          <ul className="mt-2 space-y-1 text-[var(--muted)]">
            {template.tokens.map((token) => (
              <li key={token.id}>
                {token.answer}: {token.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
