import { Card } from "@/components/ui/card";
import { AlgorithmProblem } from "@/types/dsa";

interface VisualExplanationPanelProps {
  challenge: AlgorithmProblem;
}

export function VisualExplanationPanel({ challenge }: VisualExplanationPanelProps) {
  return (
    <Card className="space-y-3">
      <h3 className="text-sm font-semibold">Visual Explanation Panel</h3>
      <ol className="space-y-2 text-xs text-[var(--muted)]">
        {challenge.steps.map((step, index) => (
          <li key={step}>
            <span className="text-[var(--foreground)]">{index + 1}.</span> {step}
          </li>
        ))}
      </ol>
      <div className="rounded-md border bg-[#101927] p-3 text-xs text-[var(--muted)]">
        <p className="mb-1 text-[var(--foreground)]">Beginner intuition</p>
        <p>{challenge.intuition}</p>
      </div>
      <div className="rounded-md border bg-[#101927] p-3 text-xs text-[var(--muted)]">
        <p className="mb-1 text-[var(--foreground)]">Diagram placeholder</p>
        <p>Visual algorithm animation slot (future extension point).</p>
      </div>
      <div className="grid gap-2 text-xs md:grid-cols-2">
        <p className="rounded border bg-[#101927] p-2">
          Time Complexity:{" "}
          <strong className="text-[var(--foreground)]">{challenge.timeComplexity}</strong>
        </p>
        <p className="rounded border bg-[#101927] p-2">
          Space Complexity:{" "}
          <strong className="text-[var(--foreground)]">{challenge.spaceComplexity}</strong>
        </p>
      </div>
    </Card>
  );
}
