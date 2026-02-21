import { ProgressBar } from "@/components/ui/progress-bar";
import { Card } from "@/components/ui/card";

interface GamificationBarProps {
  xp: number;
  level: number;
  streak: number;
  progress: number;
}

export function GamificationBar({
  xp,
  level,
  streak,
  progress,
}: GamificationBarProps) {
  return (
    <Card className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="rounded-md border px-2 py-1 text-[var(--muted)]">
          XP: <strong className="text-[var(--foreground)]">{xp}</strong>
        </span>
        <span className="rounded-md border px-2 py-1 text-[var(--muted)]">
          Level: <strong className="text-[var(--foreground)]">{level}</strong>
        </span>
        <span className="rounded-md border px-2 py-1 text-[var(--muted)]">
          Streak: <strong className="text-[var(--foreground)]">{streak}</strong>
        </span>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-[var(--muted)]">Learning path progress</p>
        <ProgressBar value={progress} />
      </div>
    </Card>
  );
}
